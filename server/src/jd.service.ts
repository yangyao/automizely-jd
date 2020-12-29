import { Injectable } from '@nestjs/common';
import {CreateJdDto} from './dtos/create-jd.dto'
import * as yaml from 'js-yaml'
import * as fs from 'fs'

interface compose {
    version: string,
    services: {[key: string]: any;}
}

@Injectable()
export class JdService {
 create(createJdDto: CreateJdDto): void {

    const content:string = fs.readFileSync(process.cwd() + '/data/docker-compose.yml').toString();

    const parsed = yaml.safeLoad(content) as compose;
    console.log(parsed);

    const payload = {
        image: 'akyakya/jd_scripts',
        container_name: `jd_scripts_${createJdDto.pt_pin}`,
        restart: 'always',
        volumes: [
            `./logs_${createJdDto.pt_pin}:/scripts/logs`
        ],
        tty: true,
        environment: [
            `JD_COOKIE=pt_key=${createJdDto.pt_key};pt_pin=${createJdDto.pt_pin}`,
            `PUSH_KEY=${createJdDto.sc_key}`
        ]
    };
    parsed.services = {...parsed.services,[createJdDto.pt_pin]: payload}
    const dumpped = yaml.safeDump(parsed);
    fs.writeFileSync(process.cwd() + '/data/docker-compose.yml', dumpped, 'utf8');
  }

  all(): string[] {
    const content:string = fs.readFileSync(process.cwd() + '/data/docker-compose.yml').toString();
    const parsed = yaml.safeLoad(content) as compose;
    return Object.keys(parsed.services);
  }
}

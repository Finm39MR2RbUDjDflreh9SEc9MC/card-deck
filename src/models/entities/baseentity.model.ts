import {Entity, model, property} from '@loopback/repository';

@model()
export class BaseEntity extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: 'uuid',
  })
  id: string;
}

// Packages
import { Global, Module } from '@nestjs/common'
// Resources
import { SharedResource } from './resources/shared.resource'

@Global()
@Module({
  providers: [SharedResource],
  exports: [SharedResource],
})
export class ConfigModule {}

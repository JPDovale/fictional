import { DateProvider } from '@providers/base/Date/contracts/DateProvider'
import { DayJSDateProvider } from '@providers/base/Date/implementations/DayJS'
import { container } from 'tsyringe'
import { ImageProvider } from '@providers/base/Image/contracts/ImageProvider'
import { JSImageProvider } from '@providers/base/Image/implementations/JSImage'
import { Providers } from './types'

container.registerSingleton<DateProvider>(Providers.Date, DayJSDateProvider)
container.registerSingleton<ImageProvider>(
  Providers.ImageProvider,
  JSImageProvider,
)

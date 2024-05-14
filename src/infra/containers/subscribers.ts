import { OnProjectWithFoundationCreated } from '@modules/foundations/subscribers/onProjectWithFoundationCreated.subscriber'
import { container } from 'tsyringe'

// ++++++++++++++++++++++++++++++++++++++++++
// Foundations
container.resolve(OnProjectWithFoundationCreated)

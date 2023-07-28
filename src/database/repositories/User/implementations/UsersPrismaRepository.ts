// import { User } from '@modules-el/Users/models/User'
// import { Either, left, right } from '@shared-el/core/error/Either'
// import { UsersRepository } from '../contracts/UsersRepository'
// // import { UniqueEntityId } from '@shared-el/core/entities/valueObjects/UniqueEntityId'
// // import { User as UserPrisma } from '@prisma/client'

// export class UsersPrismaRepository implements UsersRepository {
//   async create(_user: User): Promise<Either<{}, {}>> {
//     try {
//       // await prisma.user.create({
//       //   data: {
//       //     email: user.email,
//       //     name: user.name,
//       //     username: user.username,
//       //     admin: user.admin,
//       //     age: user.age,
//       //     avatar_filename: user.avatarFileName,
//       //     avatar_url: user.avatarUrl,
//       //     created_at: user.createdAt,
//       //     email_verified: user.emailVerified,
//       //     id: user.id.toString(),
//       //     id_customer: user.customerId,
//       //     new_notifications: user.newNotifications,
//       //     sex: user.sex,
//       //   },
//       // })

//       return right({})
//     } catch (err) {
//       return left({})
//     }
//   }

//   async findByEmail(_email: string): Promise<Either<{}, User | null>> {
//     try {
//       // const user = await prisma.user.findUnique({
//       //   where: {
//       //     email,
//       //   },
//       // })
//       // if (!user) return right(null)
//       return right(
//         // this.parser(user)
//         null,
//       )
//     } catch (err) {
//       return left({})
//     }
//   }

//   async findById(_id: string): Promise<Either<{}, User | null>> {
//     try {
//       // const user = await prisma.user.findUnique({
//       //   where: {
//       //     id,
//       //   },
//       // })
//       // if (!user) return right(null)
//       return right(
//         // this.parser(user)
//         null,
//       )
//     } catch (err) {
//       return left({})
//     }
//   }

//   // private parser(userReceived: UserPrisma): User {
//   //   const user = User.create(
//   //     {
//   //       email: userReceived.email,
//   //       name: userReceived.name,
//   //       admin: userReceived.admin,
//   //       age: userReceived.age,
//   //       avatarFileName: userReceived.avatar_filename,
//   //       avatarUrl: userReceived.avatar_url,
//   //       createdAt: userReceived.created_at,
//   //       customerId: userReceived.id_customer,
//   //       emailVerified: userReceived.email_verified,
//   //       newNotifications: userReceived.new_notifications,
//   //       sex: userReceived.sex,
//   //       username: userReceived.username,
//   //     },
//   //     new UniqueEntityId(userReceived.id),
//   //   )

//   //   return user
//   // }
// }

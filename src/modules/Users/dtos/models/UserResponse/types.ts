export abstract class UserResponseAvatar {
  abstract alt: string;

  abstract url: string | null;
}

abstract class UserResponseInfos {
  abstract username: string;

  abstract email: string;

  abstract age: number;

  abstract sex: string;

  abstract name: string;

  abstract avatar: UserResponseAvatar;

  abstract cratedAt: Date;
}

abstract class UserResponseAccount {
  abstract id: string;
}

export abstract class UserModelResponse {
  abstract infos: UserResponseInfos;

  abstract account: UserResponseAccount;
}

export abstract class UserResponsePartied {
  abstract user: UserModelResponse | null;
}

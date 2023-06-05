export class Tea {
  name: string;
  description: string;
  picture: string;
  created_at?: Date;

  constructor(data: Tea) {
    this.name = data.name;
    this.description = data.description;
    this.picture = data.picture;
    this.created_at = data.created_at;
  }

  // test

  public getDate?(): string {
    return this.created_at.toString();
  }
}

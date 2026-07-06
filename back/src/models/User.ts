import { AllowNull, Column, DataType, Default, Model, Table, Unique } from "sequelize-typescript";

@Table({
  tableName: 'users'
})

class User extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(50)
  })
  declare name: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(60)
  })
  declare password: string;

  @Unique(true)
  @AllowNull(false)
  @Column({
    type: DataType.STRING(50)
  })
  declare email: string;

  @Column({
    type: DataType.STRING(6)
  })
  declare token: string;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN
  })
  declare confirm: string;

}

export default User
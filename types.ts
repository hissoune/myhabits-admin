export type User ={
    _id?:string
    name:string,
    email:string,
    password?:string,
    birthDay:Date|null,
    image:string
    role?:string
}

export enum Frequency {
    Daily = 'daily',
    Weekly = 'weekly',
    Monthly = 'monthly'
}

export enum Status {
    Active = 'active',
    Completed = 'completed',
    Failed = 'failed'
}



export type Habit=  {
    _id?:string
    userId?: User;
    progress?: number;
    title: string;
    description?: string;
    frequency: Frequency;
    reminderTime?: Date;
    repeats:number;
    sucsess?:number;
    fails?:number;
    status?: Status;
    createdAt: Date;
    updatedAt: Date;
}
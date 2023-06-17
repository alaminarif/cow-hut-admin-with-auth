import { Model, Schema, model } from 'mongoose';
import { ICow } from './cow.interfaces';

type cowModel = Model<ICow, object>;
const cowSchema = new Schema<ICow>({
  name: { type: String, required: true },
});

const Cow = model<ICow, cowModel>('Cow', cowSchema);

export default Cow;

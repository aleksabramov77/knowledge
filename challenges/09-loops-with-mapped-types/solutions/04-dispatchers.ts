import { Equal, Expect } from '../../common';

/**
 * When managing application state, a common pattern
 * is to represent user events using "action" object.
 * Action always have a `type` discriminant property,
 * and a "payload" property containing data.
 *
 * Build a `MakeDispatchers` generic that takes a union
 * of Action objects, and turn them into an object with
 * a dispatcher method for every action. a Dispatcher takes
 * the payload and returns void.
 */
namespace dispatchers {
  type UnknownAction = { type: string; payload: unknown };

  type MakeDispatchers<ActionUnion extends UnknownAction> = {
    [Action in ActionUnion as Action['type']]: (action: Action['payload']) => void;
  };

  type CreateAction = {
    type: 'create';
    payload: { id: number; data: string[] };
  };
  type DeleteAction = { type: 'delete'; payload: number };
  type PushAction = { type: 'push'; payload: { id: number; data: string } };
  type PopAction = { type: 'pop'; payload: number };

  type res1 = MakeDispatchers<CreateAction | DeleteAction>;

  type test1 = Expect<
    Equal<
      res1,
      {
        create: (payload: { id: number; data: string[] }) => void;
        delete: (payload: number) => void;
      }
    >
  >;

  type res2 = MakeDispatchers<CreateAction | DeleteAction | PushAction | PopAction>;

  type test2 = Expect<
    Equal<
      res2,
      {
        create: (payload: { id: number; data: string[] }) => void;
        delete: (payload: number) => void;
        push: (payload: { id: number; data: string }) => void;
        pop: (payload: number) => void;
      }
    >
  >;
}

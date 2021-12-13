import { userInfo } from "os";
import { VFC, Dispatch, SetStateAction, memo } from "react";
import { Users, DeleteUserMutationFn } from "../types/generated/graphql";

interface Props {
  user: {
    _typename?: "users";
  } & Pick<Users, "id" | "name" | "created_at">;
  delete_users_by_pk: DeleteUserMutationFn;
  setEditedUser: Dispatch<
    SetStateAction<{
      id: string;
      name: string;
    }>
  >;
}

// eslint-disable-next-line react/display-name
export const UserItem: VFC<Props> = memo(
  ({ user, delete_users_by_pk, setEditedUser }) => {
    console.log("UserItem Rendered");
    return (
      <div className="my-1">
        <p className="mr-2">{user.name}</p>
        <p className="mr-2">{user.created_at}</p>
        <button
          className="mr-1 py-1 px-3 text-white bg-green-600 hover:bg-green-700 rounded-2xl focus:outline-none"
          data-testid={`edit-${user.id}`}
          onClick={() => {
            setEditedUser(user);
          }}
        >
          Edit
        </button>
        <button
          className="mr-1 py-1 px-3 text-white bg-pink-600 hover:bg-pink-700 rounded-2xl focus:outline-none"
          data-testid={`delete-${user.id}`}
          onClick={async () => {
            await delete_users_by_pk({
              variables: {
                id: user.id,
              },
            });
          }}
        >
          Delete
        </button>
      </div>
    );
  }
);

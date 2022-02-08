import { Convo } from "@theconvospace/sdk";
import { useMutation, useQuery } from "react-query";

const convo = new Convo(process.env.NEXT_PUBLIC_CONVO_API as string);

function useComments(eventId) {
  return useQuery(
    ["comments", eventId],
    () => {
      return Promise.resolve([]);
    },
    {
      enabled: Boolean(eventId),
    }
  );
}

function useCreateThread() {
  return useMutation(() => {
    return Promise.resolve([]);
    // https://docs.theconvo.space/docs/Convo-SDK/auth#authenticate-session-v2
  });
}
const Comments: React.FC = (eventId) => {
  const { data, isLoading, error } = useComments(eventId);
  return <div>comments</div>;
};

export default Comments;

import { Convo } from "@theconvospace/sdk";
import { useMutation, useQuery } from "react-query";

const convo = new Convo("CSLTXfwyv3yQTOVeu7g6dRTYfKjDxsJ5E2Vcjd4p");
function useComments(eventId) {
  return useQuery(["comments", eventId], () => {}, {
    enabled: Boolean(eventId),
  });
}

function useCreateThread() {
  return useMutation(() => {
    // https://docs.theconvo.space/docs/Convo-SDK/auth#authenticate-session-v2
  });
}
const Comments: React.FC = () => {
  const { data, isLoading, error } = useComments();
  return <div>comments</div>;
};

export default Comments;

import { ErrorText, RetryText } from '../errorAndRetry/ErrorText';
import Image from '../../../assets/images/logo192.png';
import '../../../assets/stylesheets/chat/chatBubble.scss';
import { Statuses, Roles, ChatBubbleProps } from '../../../constants';

const { failed, retrying, success, initial } = Statuses;
const { user } = Roles;

const ChatBubble = (props: ChatBubbleProps) => {
  let classNameText;
  const { isBotBubble, message, handleRetry, retryMsgId, status } = props;
  const { datetime, status: msgStatus, id, role, content } = message;

  if (isBotBubble) {
    classNameText = "bot";
  } else {
    classNameText = "user";
  }

  return (
    <div className={`${classNameText}-bubble-div`}>
      {isBotBubble ? <img alt="Chat Avatar" data-testid="bubble-avatar" className="chat-avatar" src={Image}/> : <br/>  }
      <div className={`${classNameText}-bubble`} data-testid="bubble-message" id="bubble">
        {content}
      </div>
      <br/>
      <div className={`${classNameText}-date-time`} data-testid="bubble-datetime" id="datetime">
        {datetime}
      </div>
      <br/>
      
      {((status === failed || status === initial) && role === user && msgStatus !== success) ? (
        <ErrorText handleRetry={handleRetry} id={id} />
      ) : (status === retrying && id === retryMsgId) && <RetryText />
      }
    </div>
  );
}

export default ChatBubble;

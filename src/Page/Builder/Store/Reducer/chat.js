import { ActionType } from "../../../../Common/Util/Constant";
const {
  ADD_ROOM,
  ADD_MSG,
  ADD_MSG_TO_QUEUE,
  CLEAR_MSG_QUEUE,
  SET_SELECTED_ROOM,
  ADD_UNREAD_MSG_COUNT,
  RESET_UNREAD_MSG_COUNT
} = ActionType;

export const addRoom = (roomId, roomName, roomIcon) => ({
  type: ADD_ROOM,
  roomId,
  roomName,
  roomIcon
});

export const setSelectedRoom = roomId => ({
  type: SET_SELECTED_ROOM,
  roomId
});
export const addMsg = msg => ({
  type: ADD_MSG,
  msg
});

export const addMsgToQueue = msg => ({
  type: ADD_MSG_TO_QUEUE,
  msg
});

export const clearMsgQueue = () => ({
  type: CLEAR_MSG_QUEUE
});

export const addUnreadMsgCount = roomId => ({
  type: ADD_UNREAD_MSG_COUNT,
  roomId
});

export const resetUnreadMsgCount = roomId => ({
  type: RESET_UNREAD_MSG_COUNT,
  roomId
});

const initialState = {
  messages: [],
  messageQueue: [],
  rooms: {
    all: { name: "전체", messages: [], unReadMsgCount: 0 }
  },
  selectedRoomId: "all"
};

const chat = (state = initialState, action) => {
  let room;
  switch (action.type) {
    case ADD_ROOM:
      return {
        ...state,
        rooms: {
          [action.roomId]: {
            name: action.roomName,
            messages: [],
            unReadMsgCount: 0,
            roomIcon: action.roomIcon
          },
          ...state.rooms
        }
      };
    case ADD_MSG:
      room = { ...state.rooms[action.msg.roomId] };
      room.messages.push(action.msg);
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [action.msg.roomId]: room
        }
      };
    case ADD_MSG_TO_QUEUE:
      return { ...state, messageQueue: [...state.messageQueue, action.msg] };
    case CLEAR_MSG_QUEUE:
      return { ...state, messageQueue: [] };
    case SET_SELECTED_ROOM:
      return { ...state, selectedRoomId: action.roomId };
    case ADD_UNREAD_MSG_COUNT:
      room = { ...state.rooms[action.roomId] };
      room.unReadMsgCount++;
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [action.roomId]: room
        }
      };
    case RESET_UNREAD_MSG_COUNT:
      room = { ...state.rooms[action.roomId] };
      room.unReadMsgCount = 0;
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [action.roomId]: room
        }
      };
    default:
      return state;
  }
};

export default chat;

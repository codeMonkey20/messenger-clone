import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "@/components/Room/HigherOrder/Header";
import { TbLogout, TbMessageCircle2Filled } from "react-icons/tb";
import { BsFiletypeGif, BsImage, BsPeopleFill, BsSendFill, BsThreeDots } from "react-icons/bs";
import Image from "next/image";
import ChatMenu from "@/components/Room/HigherOrder/ChatMenu";
import Title from "@/components/Room/HigherOrder/Title";
import BoldText from "@/components/BoldText";
import { MdAddCircle, MdOpenInNew } from "react-icons/md";
import SearchBar from "@/components/Room/SearchBar";
import ChatItem from "@/components/Room/ChatItem";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/popover";
import useDebouncedState from "@/hooks/useDebouncedState";
import { useEffect, useState } from "react";
import { User } from "@/types/User";
import Link from "next/link";
import PopoverMenuItem from "@/components/Room/HigherOrder/PopoverMenuItem";
import { IoIosCall, IoIosSettings } from "react-icons/io";
import LoadingBar from "@/components/LoadingBar";
import ChatList from "@/components/Room/HigherOrder/ChatList";
import ChatArea from "@/components/Room/HigherOrder/ChatArea";
import ChatAreaHeader from "@/components/Room/HigherOrder/ChatAreaHeader";
import { TiVideo } from "react-icons/ti";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/shadcn/tooltip";
import ChatAreaConvo from "@/components/Room/HigherOrder/ChatAreaConvo";
import ChatAreaInputs from "@/components/Room/HigherOrder/ChatAreaInputs";
import ChatInput from "@/components/Room/ChatInput";
import { Message } from "@/types/Messages";
import ChatRow from "@/components/Room/ChatRow";
import socket from "@/lib/socket";
import { getHotkeyHandler } from "@/hooks/useHotkeyHandler";
import { UserSession } from "@/types/UserSession";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/avatar";
import { Skeleton } from "@/components/shadcn/skeleton";
import ChatListSkeleton from "@/components/Room/Skeleton/ChatListSkeleton";
import { MessagesDB } from "@/types/MessagesDB";
import { Loader2 } from "lucide-react";
import usePageFocus from "@/hooks/usePageFocus";
import { FaHamburger } from "react-icons/fa";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "@/components/shadcn/sheet";

export default function ChatRoom() {
  const router = useRouter();
  const { id } = router.query;
  const { data, status } = useSession();
  const emptyUserSession: UserSession = {
    _id: "",
    firstName: "",
    lastName: "",
    username: "",
    avatar: "",
  };
  const userSession = data?.user ? data?.user : emptyUserSession;

  const [searchContacts, setSearchContacts] = useDebouncedState("", 300);
  const [chatList, setChatList] = useState<User[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [socketConnected, setSocketConnected] = useState(socket.connected);
  const [selectedUser, setSelectedUser] = useState<User>({});
  const [isSomeoneTyping, setIsSomeoneTyping] = useState(false);
  const [messagesLoad, setMessagesLoad] = useState(false);
  const [receiverDetails, setReceiverDetails] = useState<User>({});
  const [showSheet, setShowSheet] = useState(false);
  const isFocused = usePageFocus();

  const onSendMessage = () => {
    const trimmedMessage = chatInput.trim();
    if (trimmedMessage && socketConnected && status === "authenticated") {
      // trigger server message handle
      socket.emit("send", { message: trimmedMessage, to: selectedUser.socketID });

      // store to database
      const messageJSON: MessagesDB = {
        message: trimmedMessage,
        toUserID: Array.isArray(id) ? "" : id ? id : "",
        fromUserID: userSession._id,
        fromUserUsername: userSession.username,
        fromUserFirstName: userSession.firstName,
        fromUserAvatar: userSession.avatar,
      };
      axios.post("/api/message/create", messageJSON);

      // update chat convo
      setMessages((messages) => {
        const newMessage = {
          message: trimmedMessage,
          firstName: userSession.firstName,
          username: userSession.username,
          avatar: userSession.avatar,
          createdAt: new Date(),
        };
        return [newMessage, ...messages];
      });
      setChatInput("");
    }
  };

  const onConnect = () => {
    axios.get(`/api/user`).then(({ data }) => setChatList(data));
    setSocketConnected(true);
  };

  const onDisconnect = () => {
    setSocketConnected(false);
  };

  const onOnline = async () => {
    const allUsersResponse = await axios.get("/api/user");
    const allUsers: User[] = allUsersResponse.data;
    setChatList(allUsers);
  };

  const onTyping = (socketDetails: any) => {
    if (socketDetails.message) setIsSomeoneTyping(true);
    else setIsSomeoneTyping(false);
    setReceiverDetails({
      socketID: socketDetails.fromSocketID,
      username: socketDetails.fromUserName,
      _id: socketDetails.fromUserID,
    });
  };

  const onSend = ({ message, fromUserName, fromFirstName, fromAvatar }: any) => {
    setIsSomeoneTyping(false);
    setMessages((oldMessages) => {
      const newMessage = {
        message,
        firstName: fromFirstName,
        username: fromUserName,
        avatar: fromAvatar,
        createdAt: new Date(),
      };
      return [newMessage, ...oldMessages];
    });
  };

  // useEffect main init
  useEffect(() => {
    return () => {
      socket.disconnect();
      socket.removeAllListeners();
    };
  }, []);

  // on after authentication but before socket connection
  useEffect(() => {
    if (status === "authenticated" && !socketConnected) {
      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);
      socket.on("online", onOnline);
      socket.on("typing", onTyping);
      socket.on("send", onSend);
      socket.auth = { ...userSession };
      socket.connect();
    }
  }, [status, userSession, socketConnected]);

  // on chatlist is updated or on change user
  useEffect(() => {
    setSelectedUser(chatList.filter((user) => user._id === id)[0]);
    if (userSession._id && id) {
      setMessagesLoad(true);
      axios.get(`/api/messages?fromUserID=${userSession._id}&toUserID=${id}`).then(({ data }) => {
        const newMessages: Message[] = data.map((messageData: MessagesDB) => {
          const newMessage: Message = {
            message: messageData.message,
            username: messageData.fromUserUsername,
            firstName: messageData.fromUserFirstName,
            avatar: messageData.fromUserAvatar,
            createdAt: new Date(messageData.createdAt ? messageData.createdAt : ""),
          };
          return newMessage;
        });
        setMessages(newMessages);
        setMessagesLoad(false);
      });
    }
  }, [chatList, id, userSession]);

  // on typing
  useEffect(() => {
    if (selectedUser) {
      socket.emit("typing", { to: selectedUser.socketID, message: chatInput });
    }
  }, [chatInput, selectedUser]);

  if (status === "authenticated")
    return (
      <>
        <LoadingBar />

        <Sheet modal={false} open={showSheet} onOpenChange={() => setShowSheet((state) => !state)}>
          <SheetContent className={"w-3/4 flex flex-col gap-5"}>
            <SheetHeader>
              <BoldText className={"text-2xl"}>Chats</BoldText>
            </SheetHeader>
            <ChatList>
              {selectedUser ? (
                chatList.map(({ _id, firstName, lastName, avatar, online }: User) => {
                  if (chatList.length > 0)
                    return (
                      <Link key={_id} href={`/room/${_id}`} onClick={() => setShowSheet(false)} replace>
                        <ChatItem
                          key={_id}
                          id={_id ? _id : ""}
                          firstName={firstName ? firstName : ""}
                          lastName={lastName ? lastName : ""}
                          displayPicture={avatar ? avatar : ""}
                          online={online === true}
                          lastMessage={"Send Nudes"}
                          typing={isSomeoneTyping}
                          receiverDetails={receiverDetails}
                        />
                      </Link>
                    );
                })
              ) : (
                <ChatListSkeleton />
              )}
            </ChatList>
            <SheetFooter className={"block sm:hidden"}>
              <Popover>
                <PopoverTrigger>
                  <div className={"flex items-center gap-5"}>
                    <Image src={"/gwapo_square.jpg"} className={"rounded-full"} alt={"dp"} width={34} height={34} />
                    <div>{`${userSession.firstName} ${userSession.lastName}`}</div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className={"p-1"}>
                  <div className={"flex flex-col"}>
                    <PopoverMenuItem>
                      <IoIosSettings className={"text-lg"} />
                      Settings
                    </PopoverMenuItem>
                    <PopoverMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                      <TbLogout className={"text-lg"} />
                      Log out
                    </PopoverMenuItem>
                  </div>
                </PopoverContent>
              </Popover>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <main className={"flex h-screen max-h-screen"}>
          <Header>
            <div className={"h-full flex flex-col justify-between"}>
              <div className={"cursor-pointer"}>
                <div
                  className={"block md:hidden w-full h-12 p-3 hover:bg-gray-200 rounded-lg"}
                  onClick={() => setShowSheet((state) => !state)}
                >
                  <FaHamburger className={"w-full h-full text-black/80"} />
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className={"w-full h-12 p-3 hover:bg-gray-200 rounded-lg"}>
                        <TbMessageCircle2Filled className={"w-full h-full text-black/80"} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className={"text-dark"}>Chats</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className={"w-full h-12 p-3 hover:bg-gray-200 rounded-lg"}>
                        <BsPeopleFill className={"w-full h-full text-black/80"} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className={"text-dark"}>People</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Popover>
                <PopoverTrigger>
                  <div className={"table mx-auto"}>
                    <Image src={"/gwapo_square.jpg"} className={"rounded-full"} alt={"dp"} width={34} height={34} />
                  </div>
                </PopoverTrigger>
                <PopoverContent className={"p-1"}>
                  <div className={"flex flex-col"}>
                    <PopoverMenuItem>
                      <IoIosSettings className={"text-lg"} />
                      Settings
                    </PopoverMenuItem>
                    <PopoverMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                      <TbLogout className={"text-lg"} />
                      Log out
                    </PopoverMenuItem>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </Header>
          <ChatMenu>
            <Title>
              <BoldText className={"text-2xl"}>Chats</BoldText>
              <div className={"bg-gray-200 p-2 rounded-full"}>
                <MdOpenInNew className={"text-xl"} />
              </div>
            </Title>
            <div className={"mx-2 h-10"}>
              <SearchBar defaultValue={searchContacts} onChange={(e) => setSearchContacts(e.target.value)} />
            </div>
            <ChatList>
              {selectedUser ? (
                chatList.map(({ _id, firstName, lastName, avatar, online }: User) => {
                  if (chatList.length > 0)
                    return (
                      <Link key={_id} href={`/room/${_id}`} replace>
                        <ChatItem
                          key={_id}
                          id={_id ? _id : ""}
                          firstName={firstName ? firstName : ""}
                          lastName={lastName ? lastName : ""}
                          displayPicture={avatar ? avatar : ""}
                          online={online === true}
                          lastMessage={"Send Nudes"}
                          typing={isSomeoneTyping}
                          receiverDetails={receiverDetails}
                        />
                      </Link>
                    );
                })
              ) : (
                <ChatListSkeleton />
              )}
            </ChatList>
          </ChatMenu>
          <ChatArea>
            <ChatAreaHeader>
              <div className={"flex items-center gap-2"}>
                <div
                  className={"block sm:hidden w-10 h-10 p-2 mr-2 hover:bg-gray-200 rounded-lg"}
                  onClick={() => setShowSheet((state) => !state)}
                >
                  <FaHamburger className={"w-full h-full text-black/80"} />
                </div>
                <Avatar className="h-10 w-10">
                  {selectedUser ? (
                    <AvatarImage src={selectedUser.avatar ? selectedUser.avatar : "/Default_pfp.png"} />
                  ) : (
                    <Skeleton className="h-10 w-10 rounded-full" />
                  )}
                  <AvatarFallback>
                    <Skeleton className="h-10 w-10 rounded-full" />
                  </AvatarFallback>
                </Avatar>
                {selectedUser ? (
                  `${selectedUser.firstName} ${selectedUser.lastName}`
                ) : (
                  <>
                    <Skeleton className="h-5 w-10 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </>
                )}
              </div>
              <div className={"flex items-center gap-4 text-primary text-4xl"}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <BsThreeDots className={"p-2 rounded-full hover:bg-muted/60"} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className={"text-dark"}>Conversation information</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </ChatAreaHeader>
            <ChatAreaConvo>
              {isSomeoneTyping && receiverDetails._id === id ? (
                <div className="flex items-center gap-2 my-3">
                  <Avatar className="h-10 w-10">
                    {selectedUser ? (
                      <AvatarImage src={selectedUser.avatar ? selectedUser.avatar : "/Default_pfp.png"} />
                    ) : (
                      <Skeleton className="h-10 w-10 rounded-full" />
                    )}
                    <AvatarFallback>
                      <Skeleton className="h-10 w-10 rounded-full" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="w-[54px] h-10 rounded-full bg-muted/80 pt-4 pl-3">
                    <div className="dot-typing"></div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {messagesLoad ? (
                <div className={"flex grow items-center justify-center"}>
                  <Loader2 className="mr-2 h-8 w-8 text-primary animate-spin" />
                </div>
              ) : (
                messages.map((msg: Message, i: number) => {
                  return <ChatRow chatData={msg} key={i} self={userSession?.username === msg.username} />;
                })
              )}
            </ChatAreaConvo>
            <ChatAreaInputs>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className={"p-2 rounded-full hover:bg-muted/60"}>
                      <MdAddCircle className={"text-lg"} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className={"text-dark"}>Open more actions</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className={"p-2 rounded-full hover:bg-muted/60"}>
                      <BsImage className={"text-lg"} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className={"text-dark"}>Attach a file</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className={"p-2 rounded-full hover:bg-muted/60"}>
                      <BsFiletypeGif className={"text-lg"} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className={"text-dark"}>Choose a GIF</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <ChatInput
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={getHotkeyHandler([["Enter", onSendMessage]])}
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className={"p-2 rounded-full hover:bg-muted/60"} onClick={onSendMessage}>
                      <BsSendFill className={"text-lg"} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className={"text-dark"}>Send</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </ChatAreaInputs>
          </ChatArea>
        </main>
      </>
    );
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <Image src={"/logo.png"} alt="splash" width={80} height={80} />
    </main>
  );
}

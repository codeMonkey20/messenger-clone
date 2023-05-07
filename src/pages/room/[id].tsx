import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@/components/Room/HigherOrder/Header";
import { TbLogout, TbMessageCircle2Filled } from "react-icons/tb";
import {
  BsFiletypeGif,
  BsImage,
  BsPeopleFill,
  BsSendFill,
  BsThreeDots,
} from "react-icons/bs";
import Image from "next/image";
import ChatMenu from "@/components/Room/HigherOrder/ChatMenu";
import Title from "@/components/Room/HigherOrder/Title";
import BoldText from "@/components/BoldText";
import { MdAddCircle, MdOpenInNew } from "react-icons/md";
import SearchBar from "@/components/Room/SearchBar";
import ChatItem from "@/components/Room/ChatItem";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";
import useDebouncedState from "@/hooks/useDebouncedState";
import { useEffect, useState } from "react";
import { User } from "@/types/User";
import Link from "next/link";
import snake from "@/lib/snake";
import PopoverMenuItem from "@/components/Room/HigherOrder/PopoverMenuItem";
import { IoIosCall, IoIosSettings } from "react-icons/io";
import LoadingBar from "@/components/LoadingBar";
import ChatList from "@/components/Room/HigherOrder/ChatList";
import ChatArea from "@/components/Room/HigherOrder/ChatArea";
import ChatAreaHeader from "@/components/Room/HigherOrder/ChatAreaHeader";
import { TiVideo } from "react-icons/ti";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/tooltip";
import ChatAreaConvo from "@/components/Room/HigherOrder/ChatAreaConvo";
import ChatAreaInputs from "@/components/Room/HigherOrder/ChatAreaInputs";
import ChatInput from "@/components/Room/ChatInput";
import { Message } from "@/types/Messages";
import ChatRow from "@/components/Room/HigherOrder/ChatRow";
import { getHotkeyHandler } from "@/hooks/useHotkeyHandler";

export default function ChatRoom() {
  const router = useRouter();
  const { id } = router.query;
  const { data, status } = useSession();
  const userSession = data?.user;

  const [searchContacts, setSearchContacts] = useDebouncedState("", 300);
  const [chatList, setChatList] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Array<Message>>([
    {
      message: "hi there",
      username: "baka-test",
      firstName: "Bitch",
      avatar: "/gwapo_square.jpg",
      dateCreated: new Date(),
    },
    {
      message: "asdkfjghslkdfhjglksdjhf",
      username: "baka-test",
      firstName: "Bitch",
      avatar: "/gwapo_square.jpg",
      dateCreated: new Date(),
    },
    {
      message: "ulul",
      username: "baka-test",
      firstName: "Bitch",
      avatar: "/gwapo_square.jpg",
      dateCreated: new Date(),
    },
    {
      message:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      username: "baka-test",
      firstName: "Bitch",
      avatar: "/gwapo_square.jpg",
      dateCreated: new Date(),
    },
    {
      message: "pakyu",
      username: "baka-test",
      firstName: "Bitch",
      avatar: "/gwapo_square.jpg",
      dateCreated: new Date(),
    },
  ]);

  const handleSendMessage = () => {
    const trimmedMessage = chatInput.trim();
    if (trimmedMessage) {
      const msg = [...messages];
      msg.unshift({
        message: trimmedMessage,
        firstName: userSession?.firstName || "",
        username: userSession?.username || "",
        avatar: "",
        dateCreated: new Date(),
      });
      setMessages(msg);
    }
    setChatInput("");
  };

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((res) => {
        setChatList(res?.users);
        // console.log(res?.users);
      });
  }, []);

  useEffect(() => {
    fetch(`https://dummyjson.com/users/search?q=${snake(searchContacts)}`)
      .then((res) => res.json())
      .then((res) => {
        setChatList(res?.users);
        // console.log(res?.users);
      });
  }, [searchContacts]);

  if (status === "authenticated")
    return (
      <>
        <Head>
          <title>Messenger</title>
        </Head>
        <LoadingBar />
        <main className={"flex h-screen"}>
          <Header>
            <div className={"h-full flex flex-col justify-between"}>
              <div className={"cursor-pointer"}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div
                        className={
                          "w-full h-12 p-3 hover:bg-gray-100 rounded-lg"
                        }
                      >
                        <TbMessageCircle2Filled
                          className={"w-full h-full text-black/80"}
                        />
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
                      <div
                        className={
                          "w-full h-12 p-3 hover:bg-gray-100 rounded-lg"
                        }
                      >
                        <BsPeopleFill
                          className={"w-full h-full text-black/80"}
                        />
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
                    <Image
                      src={"/gwapo_square.jpg"}
                      className={"rounded-full"}
                      alt={"dp"}
                      width={34}
                      height={34}
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className={"p-1"}>
                  <div className={"flex flex-col"}>
                    <PopoverMenuItem>
                      <IoIosSettings className={"text-lg"} />
                      Settings
                    </PopoverMenuItem>
                    <PopoverMenuItem
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
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
              <SearchBar
                defaultValue={searchContacts}
                onChange={(e) => setSearchContacts(e.target.value)}
              />
            </div>
            <ChatList>
              {chatList.map(({ id, firstName, lastName, image }: User) => (
                <Link key={id} href={`/room/${id}`} replace>
                  <ChatItem
                    key={id}
                    id={id}
                    firstName={firstName}
                    lastName={lastName}
                    displayPicture={image}
                  />
                </Link>
              ))}
            </ChatList>
          </ChatMenu>
          <ChatArea>
            <ChatAreaHeader>
              <div className={"flex items-center gap-2"}>
                <Image
                  src={"/gwapo_square.jpg"}
                  alt={"DP"}
                  width={40}
                  height={40}
                  className={"rounded-full"}
                />
                Juliard Actub
              </div>
              <div className={"flex items-center gap-4 text-primary text-4xl"}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IoIosCall
                        className={"p-2 rounded-full hover:bg-muted/60"}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className={"text-dark"}>Start a voice call</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <TiVideo
                        className={"p-2 rounded-full hover:bg-muted/60"}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className={"text-dark"}>Start a video call</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <BsThreeDots
                        className={"p-2 rounded-full hover:bg-muted/60"}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className={"text-dark"}>Conversation information</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </ChatAreaHeader>
            <ChatAreaConvo>
              {messages.map((msg: Message, i: number) => {
                return (
                  <ChatRow
                    chatData={msg}
                    key={i}
                    self={userSession?.username === msg.username}
                  />
                );
              })}
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
                onKeyDown={getHotkeyHandler([["Enter", handleSendMessage]])}
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className={"p-2 rounded-full hover:bg-muted/60"}>
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
  else
    return (
      <main className="w-screen h-screen flex justify-center items-center">
        <Image src={"/logo.png"} alt="splash" width={80} height={80} />
      </main>
    );
}

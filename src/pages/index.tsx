import BoldText from "@/components/BoldText";
import FormPass from "@/components/FormPass";
import HigherOrderContent from "@/components/LoginHero/HigherOrder/HigherOrderContent";
import Header from "@/components/LoginHero/HigherOrder/Header";
import Content from "@/components/LoginHero/HigherOrder/Content";
import HeaderText from "@/components/LoginHero/HeaderText";
import Form from "@/components/LoginHero/HigherOrder/Form";
import FormText from "@/components/FormText";
import Image from "next/dist/client/image";
import { GetServerSidePropsContext as SSRContext } from "next";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { FormEvent, useRef, useState } from "react";
import PopupModal, { ModalHandler } from "@/components/PopupModal";
import SemiboldText from "@/components/SemiboldText";
import LoadingBar from "@/components/LoadingBar";
import { Button } from "@/components/shadcn/button";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/shadcn/label";
import { Input } from "@/components/shadcn/input";
import axios from "axios";
import { IoMdClose } from "react-icons/io";

export async function getServerSideProps({ req, res }: SSRContext) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: `/room/${session.user._id}`,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default function LandingPage() {
  const signupRef = useRef<ModalHandler>(null);
  const formElement = useRef<HTMLFormElement>(null);
  const formLoginElement = useRef<HTMLFormElement>(null);
  const file = useRef<HTMLInputElement>(null);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [signupError, setSignupError] = useState(false);

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formElement.current) return;
    setButtonLoad(true);
    const formData = new FormData(formElement.current);
    formData.append("avatar", "");
    formData.append("socketID", "");
    const formDataJSON = Object.fromEntries(formData.entries());
    const { data } = await axios.post("/api/user/create", formDataJSON);
    const newUser = data;
    if (newUser.data) {
      const { username, _id } = newUser.data;
      signIn("credentials", {
        username,
        password: formDataJSON.password,
        callbackUrl: `/room/${_id}`,
      });
    } else {
      setSignupError(true);
      setButtonLoad(false);
    }
  };

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formLoginElement.current) return;

    setButtonLoad(true);
    const formData = new FormData(formLoginElement.current);
    const formDataJSON = Object.fromEntries(formData.entries());
    const inputUsername = typeof formDataJSON.username === "string" ? formDataJSON.username : "";
    const inputPassword = typeof formDataJSON.password === "string" ? formDataJSON.password : "";
    const { data } = await axios.get(`/api/user?username=${inputUsername}&withPassword=true`);
    if (data.length === 0) {
      setLoginError(true);
      setButtonLoad(false);
      return;
    }

    const user = data[0];
    const hashCompareResponse = await axios.post("/api/hashCompare", { content: inputPassword, hash: user.password });
    const isPasswordMatch = hashCompareResponse.data.match;
    if (!isPasswordMatch) {
      setLoginError(true);
      setButtonLoad(false);
      return;
    }

    signIn("credentials", {
      username: inputUsername,
      password: inputPassword,
      callbackUrl: `/room/${user._id}`,
    });
  };

  return (
    <>
      <LoadingBar />
      <main className={"flex justify-center"}>
        <PopupModal ref={signupRef}>
          <div className={"relative flex items-center justify-center h-screen sm:h-full"}>
            <IoMdClose className={"absolute left-6 top-6 text-2xl"} onClick={() => signupRef.current?.toggle()} />
            <div
              className={
                "flex flex-col gap-8 w-4/5 sm:w-auto sm:relative sm:bg-white sm:px-20 sm:py-16 lg:px-28 lg:py-24 sm:rounded-xl sm:shadow-lg"
              }
            >
              <SemiboldText className={"text-2xl tracking-tighter text-black/80"}>Join Messenger Today</SemiboldText>
              <Form ref={formElement} onSubmit={handleSignup}>
                {signupError ? <span className={"text-red-500"}>Username exists</span> : ""}
                <FormText placeholder={"Username"} name={"username"} required />
                <FormText placeholder={"First Name"} name={"firstName"} />
                <FormText placeholder={"Last Name"} name={"lastName"} />
                <FormPass placeholder={"Password"} name={"password"} required />
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="picture">Avatar</Label>
                  <Input ref={file} id="picture" type="file" />
                </div>
                <div className={"mt-5"}>
                  <Button className="rounded-full font-bold p-6" disabled={buttonLoad}>
                    {buttonLoad ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
                    Create Account
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </PopupModal>
        <Header>
          <Image src={"/logo.png"} alt={"logo"} width={40} height={40} />
          <div className="hidden sm:flex items-center justify-between gap-9 text-sm">
            <BoldText>Features</BoldText>
            <BoldText>Desktop App</BoldText>
            <BoldText>Privacy & Safety</BoldText>
            <BoldText>For Developers</BoldText>
          </div>
        </Header>
        <HigherOrderContent>
          <Content>
            <div className={"lg:w-96 flex flex-col gap-16"}>
              <div className={"flex flex-col gap-2"}>
                <HeaderText>
                  Hangout <br />
                  anytime, anywhere
                </HeaderText>
                <text className="text-gray-500 leading-6 text-lg text-center lg:text-left">
                  Messenger makes it easy and fun to stay close to your favorite people.
                </text>
              </div>
              <Form ref={formLoginElement} onSubmit={handleSignIn}>
                {loginError ? <span className={"text-red-500"}>Incorrect username or password</span> : <></>}
                <FormText placeholder={"Username"} name={"username"} required />
                <FormPass placeholder={"Password"} name={"password"} required />
                <div className={"flex items-center gap-4 mt-5"}>
                  <Button className={"font-bold rounded-full px-7 py-6"} disabled={buttonLoad}>
                    {buttonLoad ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}Login
                  </Button>
                  <Button type={"button"} variant={"link"} onClick={() => signupRef.current?.toggle()}>
                    Signup
                  </Button>
                </div>
              </Form>
            </div>
            <div style={{ maxWidth: 600 }}>
              <Image src={"/hero.png"} alt={"hero"} width={1362} height={1436} />
            </div>
          </Content>
        </HigherOrderContent>
      </main>
    </>
  );
}

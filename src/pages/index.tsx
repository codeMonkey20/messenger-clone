import BoldText from "@/components/BoldText";
import FormPass from "@/components/FormPass";
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryText from "@/components/PrimaryText";
import HigherOrderContent from "@/components/LoginHero/HigherOrder/HigherOrderContent";
import Header from "@/components/LoginHero/HigherOrder/Header";
import Content from "@/components/LoginHero/HigherOrder/Content";
import HeaderText from "@/components/LoginHero/HeaderText";
import Form from "@/components/LoginHero/HigherOrder/Form";
import Footer from "@/components/LoginHero/HigherOrder/Footer";
import FormText from "@/components/FormText";
import Image from "next/dist/client/image";
import {
  InferGetServerSidePropsType as SSRPropsType,
  GetServerSidePropsContext as SSRContext,
} from "next";
import { getServerSession } from "next-auth";
import { getCsrfToken, signIn } from "next-auth/react";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { FormEvent, useRef } from "react";
import { useRouter } from "next/router";
import PopupModal, { ModalHandler } from "@/components/PopupModal";
import SemiboldText from "@/components/SemiboldText";
import Head from "next/head";
import LoadingBar from "@/components/LoadingBar";

interface SSRProps extends SSRPropsType<typeof getServerSideProps> {}

export async function getServerSideProps(context: SSRContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: "/room/1",
        permanent: false,
      },
    };
  }
  return {
    props: {
      token: await getCsrfToken(context),
    },
  };
}

export default function LandingPage({ token }: SSRProps) {
  const router = useRouter();
  const { error } = router.query;
  const signupRef = useRef<ModalHandler>(null);
  const formElement = useRef<HTMLFormElement>(null);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formElement.current) return;

    const formData = new FormData(formElement.current);
    const formDataJSON = Object.fromEntries(formData.entries());
    const formDataString = JSON.stringify(formDataJSON);
    const res = await fetch("/api/user", {
      method: "POST",
      body: formDataString,
    });
    const resJSON = await res.json();
    if (resJSON.data) {
      signIn("credentials", {
        username: formDataJSON?.username,
        password: formDataJSON?.password,
        callbackUrl: "/",
      });
    } else {
      // error handling
    }
  };

  return (
    <>
      <Head>
        <title>Messenger</title>
      </Head>
      <LoadingBar />
      <main className={"flex justify-center"}>
        <PopupModal ref={signupRef}>
          <div className={"flex items-center justify-center h-full"}>
            <div
              className={
                "flex flex-col gap-8 w-4/5 sm:w-auto sm:relative sm:bg-white sm:px-20 sm:py-16 lg:px-28 lg:py-24 sm:rounded-xl sm:shadow-lg"
              }
            >
              <SemiboldText
                className={"text-2xl tracking-tighter text-black/80"}
              >
                Join Messenger Today
              </SemiboldText>
              <Form ref={formElement} onSubmit={handleLogin}>
                <FormText placeholder={"Username"} name={"username"} required />
                <FormText placeholder={"First Name"} name={"firstName"} />
                <FormText placeholder={"Last Name"} name={"lastName"} />

                <FormPass placeholder={"Password"} name={"password"} required />
                <div className={"mt-5"}>
                  <PrimaryButton type={"submit"}>Create Account</PrimaryButton>
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
                  Messenger makes it easy and fun to stay close to your favorite
                  people.
                </text>
              </div>
              <Form method={"post"} action={"/api/auth/callback/credentials"}>
                <input name="csrfToken" type="hidden" defaultValue={token} />
                <span className={"text-red-500"}>
                  {error ? "Incorrect username or password" : ""}
                </span>
                <FormText placeholder={"Username"} name={"username"} required />
                <FormPass placeholder={"Password"} name={"password"} required />
                <div className={"flex items-center gap-4 mt-5"}>
                  <PrimaryButton type={"submit"}>Login</PrimaryButton>
                  <button
                    type={"button"}
                    onClick={() => signupRef.current?.toggle()}
                  >
                    <PrimaryText
                      className={
                        "underline cursor-pointer font-semibold text-sm"
                      }
                    >
                      Signup
                    </PrimaryText>
                  </button>
                </div>
              </Form>
            </div>
            <div style={{ maxWidth: 600 }}>
              <Image
                src={"/hero.png"}
                alt={"hero"}
                width={1362}
                height={1436}
              />
            </div>
          </Content>
          <Footer></Footer>
        </HigherOrderContent>
      </main>
    </>
  );
};

import { getLatestEvents } from "@/actions/event";
import { getUser } from "@/actions/user";
import { auth } from "@/auth";
import SignInButton from "./components/login";
import Logout from "./components/logout";
import PhoneForm from "./components/phone";
export default async function Home() {
    const session = await auth();
    const { events, message } = await getLatestEvents(
        session?.user?.accessToken
    );
    const userData: any = await getUser();

    return (
        <div className="grid mt-64 grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
                <h1 className="text-4xl font-bold my-4">
                    Google Calendar Manager
                </h1>

                {!userData?.user?.phone && !!session && <PhoneForm />}

                {session ? (
                    <>
                        <p className="my-4 text-green-600 ">
                            Signed in as {session.user?.email}
                        </p>
                        <Logout />
                        <div className=" mt-3 bg-white shadow-md rounded-2xl p-6 max-w-md mx-auto">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                📅 Upcoming Events
                            </h2>
                            {events && events.length > 0 ? (
                                <ul className="space-y-3">
                                    {events.map((event) => {
                                        const date = new Date(
                                            event.start?.dateTime ||
                                                (event?.start?.date as any)
                                        ).toLocaleDateString(undefined, {
                                            weekday: "short",
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        });

                                        return (
                                            <li
                                                key={event.id}
                                                className="bg-blue-50 hover:bg-blue-100 transition-all duration-200 rounded-xl p-4 shadow-sm"
                                            >
                                                <p className="text-lg font-medium text-blue-900">
                                                    {event.summary ||
                                                        "No Title"}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    📆 {date}
                                                </p>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <p className="text-center text-gray-500 italic text-sm mt-4">
                                    🎉 Nothing on the calendar yet — time to
                                    plan something fun!
                                </p>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        {" "}
                        <p className="mb-6 text-lg text-gray-700 text-center max-w-xl">
                            Sign in with your Google account to view, create,
                            and manage your calendar events seamlessly.
                        </p>
                        <SignInButton />
                    </>
                )}
            </div>
        </div>
    );
}

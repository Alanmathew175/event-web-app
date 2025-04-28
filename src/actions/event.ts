import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
export const getLatestEvents = async (token: any) => {
    try {
        const authClient = new OAuth2Client();
        authClient.setCredentials({ access_token: token });
        const calendar = google.calendar({ version: "v3", auth: authClient });
        const now = new Date();
        const eventsResponse = await calendar.events.list({
            calendarId: "primary",
            timeMin: now.toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: "startTime",
        });

        const events = eventsResponse.data.items;
        console.log(events);
        return { events };
    } catch (error) {
        return { message: "failed to fetch the events" };
    }
};

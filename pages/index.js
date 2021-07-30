import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetUpList from "../components/meetups/MeetupList";
import { Fragment } from "react";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly active React Meetups" />
      </Head>
      <MeetUpList meetups={props.meetups} />;
    </Fragment>
  );
}

export async function getStaticProps() {
  // fetch datafrom an API endpoint

  const uri = "mongodb+srv://test:YEeKkVH9vYd96T5@cluster0.9qhae.mongodb.net/meetups?retryWrites=true&w=majority";
  const client = await MongoClient.connect(uri);
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;

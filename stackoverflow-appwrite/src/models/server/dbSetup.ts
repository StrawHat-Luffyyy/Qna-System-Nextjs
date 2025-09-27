import { db } from "../name";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";
import createAnswerCollection from "./answer.collection";
import { databases } from "./config";

export default async function getOrCreated() {
  try {
    await databases.get(db);
    console.log("Databases connection");
  } catch (error) {
    try {
      await databases.create(db, db); 
      console.log("Databases created");
      await Promise.all([
        createAnswerCollection(),
        createCommentCollection(),
        createQuestionCollection(),
        createVoteCollection(),
      ]);
      console.log("Collection created");
      console.log("Database connected");
    } catch (error) {
      console.error("Error creating databases or collection", error);
    }
  }
  return databases;
}

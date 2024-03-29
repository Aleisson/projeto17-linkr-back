
import db from '../database/database.js';

export async function findHashtag() {
    const {rows: topicResults} = await db.query(`
    SELECT "topicId", topics.name, COUNT("topicId") as "existinPosts"
    FROM * "topicPosts" JOIN topics
    ON topics.id = "topicsPosts", "topicId"
    GROUP BY "topicId", topics.name
    ORDER BY "existinPosts" DESC
    LIMIT 10
    `);

    return topicResults
}

export async function findHashtagByName(topicName){
    const {rows: topicResults} = await db.query(`
    SELECT id FROM topics WHERE topics.name = $1;
    `, [topicName]);
    return topicResults
}

export async function findPostWithHashtag(topicId){
    const {rows: postsResults} = await db.query(`
    SELECT
    posts.id AS id, posts.content AS text, post.link AS link, users.id AS "userId" 
    FROM posts
    JOIN "topicsPosts" ON "topicsPosts"."postId" = posts.id
    JOIN users ON posts."userId" = users.id
    WHERE "topicsPosts"."topicId" = $1
    LIMIT 20
    `, [topicId]);
    return postsResults
}

export async function createPostWithaHashtag(postId, topicId){
    const {rows: newPost} = await db.query(`
    INSERT INTO "topicsPosts" ("postsId", "topicId")
    VALUES ($1, $2)
    `, [postId, topicId]);
    return newPost
}

export async function createNewHashtag(topicName) {
    const {rows: newHashtag} = await db.query(`
    INSERT INTO topics (name)
    VALUES ($1) RETURNING id`, [topicName]);
    return newHashtag;
}



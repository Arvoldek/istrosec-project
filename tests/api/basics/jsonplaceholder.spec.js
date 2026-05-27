const { test, expect } = require('@playwright/test');
const env = require('../../../configs/environments.js').jsonplaceholder;

const BASE_URL = env.baseUrl;

test.describe('JSONPlaceholder API Tests - CRUD Operations', () => {
  let createdPostId;

  // API-B-001: GET all posts
  test('API-B-001: GET all posts - verify status and structure', async ({ request }) => {
    const response = await request.get(`${BASE_URL}${env.postsEndpoint}`);
    expect(response.status()).toBe(200);
    const posts = await response.json();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0]).toHaveProperty('id');
    expect(posts[0]).toHaveProperty('title');
    expect(posts[0]).toHaveProperty('body');
    expect(posts[0]).toHaveProperty('userId');
  });

  // API-B-002: GET single post
  test('API-B-002: GET single post - verify status and structure', async ({ request }) => {
    const response = await request.get(`${BASE_URL}${env.postsEndpoint}/1`);
    expect(response.status()).toBe(200);
    const post = await response.json();
    expect(post).toHaveProperty('id', 1);
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');
    expect(post).toHaveProperty('userId');
  });

  // API-B-003: GET non-existent post
  test('API-B-003: GET non-existent post - verify 404', async ({ request }) => {
    const response = await request.get(`${BASE_URL}${env.postsEndpoint}/999`);
    expect(response.status()).toBe(404);
    const data = await response.json();
    expect(data).toEqual({});
  });

  // API-B-004: POST create post
  test('API-B-004: POST create new post', async ({ request }) => {
    const newPost = {
      title: 'Test Post',
      body: 'This is a test post',
      userId: 1
    };
    const response = await request.post(`${BASE_URL}${env.postsEndpoint}`, { data: newPost });
    expect(response.status()).toBe(201);
    const createdPost = await response.json();
    expect(createdPost.id).toBeTruthy();
    expect(createdPost.title).toBe(newPost.title);
    expect(createdPost.body).toBe(newPost.body);
    expect(createdPost.userId).toBe(newPost.userId);
    createdPostId = createdPost.id;
  });

  // API-B-005: POST with invalid data
  test('API-B-005: POST with invalid data - verify server handles it', async ({ request }) => {
    const invalidPost = {
      title: '',
      body: ''
    };
    const response = await request.post(`${BASE_URL}${env.postsEndpoint}`, { data: invalidPost });
    // JSONPlaceholder accepts any data and returns it with an ID
    expect(response.status()).toBe(201);
    const createdPost = await response.json();
    expect(createdPost.id).toBeTruthy();
    // This test verifies the endpoint accepts the request even with empty data
    // In a real scenario, this would test validation logic
  });

  // API-B-006: PUT update post
  test('API-B-006: PUT update existing post', async ({ request }) => {
    const updatedData = {
      id: 1,
      title: 'Updated Post Title',
      body: 'This post has been updated',
      userId: 1
    };
    const response = await request.put(`${BASE_URL}${env.postsEndpoint}/1`, { data: updatedData });
    expect(response.status()).toBe(200);
    const updatedPost = await response.json();
    expect(updatedPost.id).toBe(1);
    expect(updatedPost.title).toBe(updatedData.title);
    expect(updatedPost.body).toBe(updatedData.body);
  });

  // API-B-007: PUT non-existent post
  test('API-B-007: PUT non-existent post - verify server response', async ({ request }) => {
    const updateData = {
      id: 999,
      title: 'Non-existent Post',
      body: 'This should not exist',
      userId: 1
    };
    const response = await request.put(`${BASE_URL}${env.postsEndpoint}/999`, { data: updateData });
    // JSONPlaceholder returns 500 for non-existent resources on PUT
    expect(response.status()).toBe(500);
    // Response body is not JSON, so just verify status
  });

  // API-B-008: DELETE post
  test('API-B-008: DELETE existing post', async ({ request }) => {
    // First create a post to delete
    const newPost = { title: 'To Delete', body: 'Will be deleted', userId: 1 };
    const createResponse = await request.post(`${BASE_URL}${env.postsEndpoint}`, { data: newPost });
    const post = await createResponse.json();
    expect(createResponse.status()).toBe(201);
    
    // Delete the post
    const deleteResponse = await request.delete(`${BASE_URL}${env.postsEndpoint}/${post.id}`);
    expect(deleteResponse.status()).toBe(200);
    const deletedData = await deleteResponse.json();
    expect(deletedData).toEqual({});
  });

  // API-B-009: DELETE non-existent post
  test('API-B-009: DELETE non-existent post - verify server response', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}${env.postsEndpoint}/999`);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toEqual({});
  });

  // API-B-010: GET user posts
  test('API-B-010: GET user posts - verify query parameters work', async ({ request }) => {
    const response = await request.get(`${BASE_URL}${env.postsEndpoint}?userId=1`);
    expect(response.status()).toBe(200);
    const posts = await response.json();
    expect(posts.length).toBeGreaterThan(0);
    // Verify all returned posts belong to userId 1
    posts.forEach(post => {
      expect(post.userId).toBe(1);
    });
  });
});

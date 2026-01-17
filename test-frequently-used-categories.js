// Import node-fetch using CommonJS syntax
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Base URL for the API
const BASE_URL = 'http://localhost:3000/api';

// Test function to create a comment and verify use_count is incremented
async function testFrequentlyUsedCategories() {
    try {
        console.log('=== Testing Frequently Used Categories ===\n');

        // 1. Get all categories first to see initial use_count
        console.log('1. Getting initial categories...');
        const categoriesResponse = await fetch(`${BASE_URL}/category`);
        const categoriesData = await categoriesResponse.json();
        console.log('Categories response:', categoriesData);

        // Get a category ID to test with
        const testCategory = categoriesData.data[0];
        if (!testCategory) {
            console.log('No categories found. Please add some categories first.');
            return;
        }
        
        console.log('\nTest category:', testCategory);
        const initialUseCount = testCategory.use_count || 0;
        console.log('Initial use_count:', initialUseCount);

        // 2. Create a new comment for this category
        console.log('\n2. Creating a new comment...');
        const commentResponse = await fetch(`${BASE_URL}/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category: testCategory.id,
                categoryName: testCategory.name,
                content: '这是一条测试评论',
                userId: 'test-user-123'
            })
        });
        
        const commentData = await commentResponse.json();
        console.log('Comment creation response:', commentData);

        // 3. Get the category again to verify use_count has increased
        console.log('\n3. Verifying use_count increment...');
        const updatedCategoriesResponse = await fetch(`${BASE_URL}/category`);
        const updatedCategoriesData = await updatedCategoriesResponse.json();
        
        const updatedCategory = updatedCategoriesData.data.find(cat => cat.id === testCategory.id);
        console.log('Updated category:', updatedCategory);
        const updatedUseCount = updatedCategory.use_count || 0;
        console.log('Updated use_count:', updatedUseCount);

        // Verify use_count has increased by 1
        if (updatedUseCount === initialUseCount + 1) {
            console.log('✅ SUCCESS: use_count incremented correctly!');
        } else {
            console.log('❌ FAILURE: use_count not incremented correctly');
            console.log('Expected:', initialUseCount + 1);
            console.log('Actual:', updatedUseCount);
        }

        // 4. Test frequentlyUsed endpoint
        console.log('\n4. Testing frequentlyUsed endpoint...');
        const frequentlyUsedResponse = await fetch(`${BASE_URL}/category?frequentlyUsed=true`);
        const frequentlyUsedData = await frequentlyUsedResponse.json();
        console.log('Frequently used categories response:', frequentlyUsedData);

        console.log('\n=== Test completed ===');
    } catch (error) {
        console.error('Error during testing:', error);
    }
}

// Run the test
testFrequentlyUsedCategories();
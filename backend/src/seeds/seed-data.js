#!/usr/bin/env node

/**
 * Seed Script für CSS Insurance Platform
 *
 * Lädt Testdaten aus JSON-Dateien und spielt sie über die REST API ein.
 *
 * Verwendung:
 *   node seed-data.js
 *   node seed-data.js --api-url=http://localhost:3000/api
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const apiUrlArg = args.find(arg => arg.startsWith('--api-url='));
const API_BASE_URL = apiUrlArg
  ? apiUrlArg.split('=')[1]
  : process.env.API_URL || 'http://localhost:3000/api';

console.log(`🌱 Seeding data to ${API_BASE_URL}\n`);

// Helper function to make HTTP requests
async function makeRequest(endpoint, method = 'GET', data = null) {
  const url = `${API_BASE_URL}${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Request to ${url} failed: ${error.message}`);
  }
}

// Load JSON file
function loadJsonFile(filename) {
  const filePath = path.join(__dirname, filename);

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

// Seed offers
async function seedOffers() {
  console.log('📄 Seeding Offers...');

  try {
    const offers = loadJsonFile('offers.json');
    let successCount = 0;
    let errorCount = 0;

    for (const offer of offers) {
      try {
        const result = await makeRequest('/offers', 'POST', offer);
        console.log(`  ✅ Created offer for ${offer.customerName} - ${offer.insuranceType}`);
        successCount++;
      } catch (error) {
        console.error(`  ❌ Failed to create offer for ${offer.customerName}: ${error.message}`);
        errorCount++;
      }
    }

    console.log(`  Summary: ${successCount} created, ${errorCount} failed\n`);
    return successCount;
  } catch (error) {
    console.error(`  ❌ Error loading offers: ${error.message}\n`);
    return 0;
  }
}

// Seed policies
async function seedPolicies() {
  console.log('📋 Seeding Policies...');

  try {
    const policies = loadJsonFile('policies.json');
    let successCount = 0;
    let errorCount = 0;

    for (const policy of policies) {
      try {
        const result = await makeRequest('/policies', 'POST', policy);
        console.log(`  ✅ Created policy ${policy.policyNumber} for ${policy.customerName}`);
        successCount++;
      } catch (error) {
        console.error(`  ❌ Failed to create policy ${policy.policyNumber}: ${error.message}`);
        errorCount++;
      }
    }

    console.log(`  Summary: ${successCount} created, ${errorCount} failed\n`);
    return successCount;
  } catch (error) {
    console.error(`  ❌ Error loading policies: ${error.message}\n`);
    return 0;
  }
}

// Seed claims
async function seedClaims() {
  console.log('🔔 Seeding Claims...');

  try {
    const claims = loadJsonFile('claims.json');
    let successCount = 0;
    let errorCount = 0;

    for (const claim of claims) {
      try {
        const result = await makeRequest('/claims', 'POST', claim);
        console.log(`  ✅ Created claim ${claim.claimNumber} - ${claim.claimType}`);
        successCount++;
      } catch (error) {
        console.error(`  ❌ Failed to create claim ${claim.claimNumber}: ${error.message}`);
        errorCount++;
      }
    }

    console.log(`  Summary: ${successCount} created, ${errorCount} failed\n`);
    return successCount;
  } catch (error) {
    console.error(`  ❌ Error loading claims: ${error.message}\n`);
    return 0;
  }
}

// Check if API is available
async function checkApiHealth() {
  console.log('🔍 Checking API health...');

  try {
    await makeRequest('/health', 'GET');
    console.log('  ✅ API is reachable\n');
    return true;
  } catch (error) {
    console.error(`  ❌ API not reachable: ${error.message}`);
    console.error('  Please make sure the backend is running!\n');
    return false;
  }
}

// Clear existing data (optional)
async function clearData() {
  console.log('🗑️  Clearing existing data...');

  try {
    // Note: This requires DELETE endpoints to be implemented
    // For now, we'll just skip this step
    console.log('  ⚠️  Data clearing not implemented - new data will be added\n');
  } catch (error) {
    console.error(`  ❌ Error clearing data: ${error.message}\n`);
  }
}

// Main function
async function main() {
  console.log('='.repeat(60));
  console.log('  CSS Insurance Platform - Data Seeding Script');
  console.log('='.repeat(60));
  console.log();

  // Check if API is available
  const apiAvailable = await checkApiHealth();

  if (!apiAvailable) {
    console.log('❌ Seeding aborted - API not available\n');
    process.exit(1);
  }

  // Optional: Clear existing data
  // await clearData();

  // Seed data in order
  const offersCreated = await seedOffers();
  const policiesCreated = await seedPolicies();
  const claimsCreated = await seedClaims();

  // Summary
  console.log('='.repeat(60));
  console.log('  Seeding Complete!');
  console.log('='.repeat(60));
  console.log(`  Offers:   ${offersCreated} created`);
  console.log(`  Policies: ${policiesCreated} created`);
  console.log(`  Claims:   ${claimsCreated} created`);
  console.log('='.repeat(60));
  console.log();

  const total = offersCreated + policiesCreated + claimsCreated;

  if (total > 0) {
    console.log('✅ Seeding completed successfully!\n');
    process.exit(0);
  } else {
    console.log('⚠️  No data was seeded. Please check the errors above.\n');
    process.exit(1);
  }
}

// Run the script
main().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});


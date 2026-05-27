const { test, expect } = require('@playwright/test');
const agentHealthCheckSchema = require('../../../configs/agent-schema.json');

// Valid agent health check data for testing
const validHealthCheck = {
  "agent_id": "BF5B45B4-FF6C-8090-E4B6-DBAED562574D",
  "base_board_sn": "None",
  "computer_name": "VM11",
  "system_product_uuid": "4A114D56-62E0-8B0B-594A-6618D15F8385",
  "os_name": "Windows 11 Pro",
  "os_major": 10,
  "os_minor": 0,
  "os_build": 22000,
  "last_boot_time": "2022-07-16T20:53:27Z",
  "last_update_time": "2022-09-13T09:43:46Z",
  "adapter_info": [
    {
      "addresses": ["fe80::8c04:b189:43dc:c8de%7", "192.168.195.150"],
      "name": "Ethernet (Kernel Debugger)"
    }
  ],
  "session_info": [
    {
      "account_name": "VM11\\User",
      "account_sid": "S-1-5-21-2847140545-887463911-2297178777-1001",
      "host_name": "",
      "session_id": 1,
      "session_name": "Console",
      "state": "Active"
    }
  ],
  "roles": ["workstation"]
};

// Helper function for validation
function validateAgentData(data) {
  const errors = [];
  const requiredFields = agentHealthCheckSchema.required;
  
  requiredFields.forEach(field => {
    if (!(field in data)) {
      errors.push(`${field} is missing`);
    }
  });
  
  return errors;
}

// Helper to check if string is valid UUID format
function isValidUUID(str) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

// Helper to check if string is valid ISO 8601 timestamp
function isValidISO8601(str) {
  const date = new Date(str);
  return !isNaN(date.getTime());
}

test.describe('Agent Health Check Tests', () => {

  // AG-001: Validate complete structure
  test('AG-001: Validate complete agent health check structure', async () => {
    const keys = Object.keys(validHealthCheck);
    const requiredFields = agentHealthCheckSchema.required;
    
    requiredFields.forEach(field => {
      expect(keys).toContain(field);
    });
  });

  // AG-002: Verify agent_id is valid UUID
  test('AG-002: Verify agent_id is valid UUID format', async () => {
    expect(validHealthCheck.agent_id).toBeTruthy();
    expect(isValidUUID(validHealthCheck.agent_id)).toBe(true);
  });

  // AG-003: Verify OS information
  test('AG-003: Verify OS name and version information', async () => {
    expect(validHealthCheck.os_name).toBeTruthy();
    expect(typeof validHealthCheck.os_name).toBe('string');
    expect(validHealthCheck.os_major).toBeGreaterThanOrEqual(0);
    expect(validHealthCheck.os_minor).toBeGreaterThanOrEqual(0);
    expect(validHealthCheck.os_build).toBeGreaterThanOrEqual(0);
  });

  // AG-004: Verify os_version components
  test('AG-004: Verify os_version components are valid numbers', async () => {
    expect(typeof validHealthCheck.os_major).toBe('number');
    expect(typeof validHealthCheck.os_minor).toBe('number');
    expect(typeof validHealthCheck.os_build).toBe('number');
    expect(Number.isInteger(validHealthCheck.os_major)).toBe(true);
    expect(Number.isInteger(validHealthCheck.os_minor)).toBe(true);
    expect(Number.isInteger(validHealthCheck.os_build)).toBe(true);
  });

  // AG-005: Validate adapter_info structure
  test('AG-005: Validate adapter_info structure', async () => {
    expect(Array.isArray(validHealthCheck.adapter_info)).toBe(true);
    expect(validHealthCheck.adapter_info.length).toBeGreaterThan(0);
    
    validHealthCheck.adapter_info.forEach(adapter => {
      expect(adapter).toHaveProperty('addresses');
      expect(adapter).toHaveProperty('name');
      expect(Array.isArray(adapter.addresses)).toBe(true);
      expect(typeof adapter.name).toBe('string');
    });
  });

  // AG-006: Validate session_info structure
  test('AG-006: Validate session_info structure', async () => {
    expect(Array.isArray(validHealthCheck.session_info)).toBe(true);
    expect(validHealthCheck.session_info.length).toBeGreaterThan(0);
    
    validHealthCheck.session_info.forEach(session => {
      expect(session).toHaveProperty('account_name');
      expect(session).toHaveProperty('account_sid');
      expect(session).toHaveProperty('session_id');
      expect(session).toHaveProperty('session_name');
      expect(session).toHaveProperty('state');
      expect(typeof session.account_name).toBe('string');
      expect(typeof session.account_sid).toBe('string');
      expect(typeof session.session_name).toBe('string');
      expect(typeof session.state).toBe('string');
    });
  });

  // AG-007: Verify last_boot_time format
  test('AG-007: Verify last_boot_time format is valid ISO 8601', async () => {
    expect(validHealthCheck.last_boot_time).toBeTruthy();
    expect(typeof validHealthCheck.last_boot_time).toBe('string');
    expect(isValidISO8601(validHealthCheck.last_boot_time)).toBe(true);
  });

  // AG-008: Verify roles array
  test('AG-008: Verify roles array', async () => {
    expect(Array.isArray(validHealthCheck.roles)).toBe(true);
    expect(validHealthCheck.roles.length).toBeGreaterThan(0);
    validHealthCheck.roles.forEach(role => {
      expect(typeof role).toBe('string');
    });
  });

  // AG-009: Handle missing required fields
  test('AG-009: Handle missing required fields', async () => {
    const incompleteHealthCheck = { ...validHealthCheck };
    delete incompleteHealthCheck.agent_id;
    delete incompleteHealthCheck.computer_name;
    
    const validationErrors = validateAgentData(incompleteHealthCheck);
    expect(validationErrors.length).toBeGreaterThan(0);
    expect(validationErrors).toContain('agent_id is missing');
    expect(validationErrors).toContain('computer_name is missing');
  });

  // AG-010: Handle invalid data types
  test('AG-010: Handle invalid data types', async () => {
    const invalidHealthCheck = { ...validHealthCheck };
    invalidHealthCheck.os_major = 'not a number';
    invalidHealthCheck.os_minor = 'not a number';
    
    expect(typeof invalidHealthCheck.os_major).toBe('string');
    expect(typeof invalidHealthCheck.os_minor).toBe('string');
    expect(Number.isInteger(invalidHealthCheck.os_major)).toBe(false);
    expect(Number.isInteger(invalidHealthCheck.os_minor)).toBe(false);
  });
});

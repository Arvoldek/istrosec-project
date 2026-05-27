# Technical task #1

## Frontend test automation

### Instructions:

- Design and implement some test cases to test the main functionality of the page
  below and automate it.
- In each test case, you should describe why you think this functionality is essential.
- Ensure that you can run your test from command line to demonstrate to the
  interview that tests work.
- Results/Codes should be published using Github and containing all required
  information to be able to run it locally.
- Techstack: Use a framework playwright, or cypress, probably pytest.
- Share your solution with us via GitHub martin.kratmuller@istrosec.com
- Test User Data - They can be found directly on the website.
  System under test (SUT)
- https://www.saucedemo.com/

# Technical task #2

## API test automation – basics

### Instructions:

- Design and implement some positive and negative test cases to test the main CRUD
  functionality and automate it.
- In each test case, you should describe why you think this functionality is essential.
- Ensure that you can run your test from command line to demonstrate to the
  interview that tests work.
- Results should be published using Github and containing all required information to
  be able to run it locally.
- Techstack: Use a framework playwright, probably pytest
- Share your solution with us via GitHub martin.kratmuller@istrosec.com
  System under test (SUT)
- https://jsonplaceholder.typicode.com/

# Technical task #3

## Agent test automation

### Instructions:

One of the calls that takes place between the agent and the server in the product is the
periodic agent health check — it contains information about the agent itself and about the
host operating system. The purpose of this communication is to keep the server updated
about individual agents and changes in their status. The call itself regularly sends the
following JSON object:

```json
{
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
    },
    {
      "addresses": ["::1", "127.0.0.1"],
      "name": "Loopback Pseudo-Interface 1",
      "account_name": "",
      "account_sid": "",
      "host_name": "",
      "session_id": 0,
      "session_name": "Services",
      "state": "Disconnected"
    }
  ],
  "session_info": [
    {
      "account_name": "",
      "account_sid": "",
      "host_name": "",
      "session_id": 0,
      "session_name": "Services",
      "state": "Disconnected"
    },
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
}
```

- Design and implement test cases to test the main functionality and automate it.
- In each test case, you should describe why you think this functionality is essential.
- Ensure that you can run your test from command line to demonstrate to the
  interview that tests work.
- Results should be published using Github and containing all required information to
  be able to run it locally.
- Techstack: Use a framework playwright, probably pytest.
- Share your solution with us via GitHub martin.kratmuller@istrosec.com

# Technical task #4

## API test automation – auth

### Instructions:

- Design and implement some positive and negative test cases to test the
  authorization functionality and automate it.
- In each test case, you should describe why you think this functionality is essential.
- Ensure that you can run your test from command line to demonstrate to the
  interview that tests work.
- Results should be published using Github and containing all required information to
  be able to run it locally.
- Techstack: Use a framework playwright, probably pytest.
- Share your solution with us via GitHub martin.kratmuller@istrosec.com
  System under test (SUT)
- https://postman-echo.com/

# Technical task #5

## Performance tests

### Instructions:

- Design and implement some test cases to test the performance of endpoint and
  automate it.
- In each test case, you should describe why you think this functionality is essential.
- Ensure that you can run your test from command line to demonstrate to the
  interview that tests work.
- Results should be published using Github and containing all required information to
  be able to run it locally.
- Techstack: Use a Jmeter
- Share your solution with us via GitHub martin.kratmuller@istrosec.com
  System under test (SUT)
- httpbin.org

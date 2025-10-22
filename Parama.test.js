import { test, expect, devices, chromium, firefox, webkit } from '@playwright/test';
import https from 'https';
import fs from 'fs';

const Data = {
  environments: [
    'https://parama.sites.dev.thirdstream.ca/inbranch/deposits/en/app/flow/welcome',
    'https://parama.sites.qa.thirdstream.ca/inbranch/deposits/en/app/flow/welcome',
    'https://parama.sites.test.thirdstream.ca/inbranch/deposits/en/app/flow/welcome',
    'https://parama.sites.staging.thirdstream.ca/inbranch/deposits/en/app/flow/welcome',
    'https://parama.sites.staging.thirdstream.ca/inbranch/deposits/en/app/flow/welcome'
  ],
  devices: [
    { name: 'Desktop Chrome', engine: 'chromium', channel: 'chrome', config: null },
    { name: 'Desktop Firefox', engine: 'firefox', channel: undefined, config: null },
    { name: 'Desktop Safari', engine: 'webkit', channel: undefined, config: null },
    { name: 'Desktop Edge', engine: 'chromium', channel: 'msedge', config: null },
    { name: 'iPhone 14', engine: 'chromium', channel: undefined, config: devices['iPhone 14'] },
    { name: 'iPhone 14 Pro', engine: 'chromium', channel: undefined, config: devices['iPhone 14 Pro'] },
    { name: 'iPhone 13', engine: 'chromium', channel: undefined, config: devices['iPhone 13'] },
    { name: 'iPhone 12', engine: 'chromium', channel: undefined, config: devices['iPhone 12'] },
    { name: 'iPhone SE', engine: 'chromium', channel: undefined, config: devices['iPhone SE'] },
    { name: 'iPad Pro', engine: 'chromium', channel: undefined, config: devices['iPad Pro'] },
    { name: 'iPad Mini', engine: 'chromium', channel: undefined, config: devices['iPad Mini'] },
    { name: 'Samsung Galaxy S9+', engine: 'chromium', channel: undefined, config: devices['Galaxy S9+'] },
    { name: 'Samsung Galaxy Note 10', engine: 'chromium', channel: undefined, config: devices['Galaxy Note 10'] },
    { name: 'Samsung Galaxy Tab S4', engine: 'chromium', channel: undefined, config: devices['Galaxy Tab S4'] },
    { name: 'Pixel 5', engine: 'chromium', channel: undefined, config: devices['Pixel 5'] }
  ],
  users: [
    {
      name: 'Peter TestPhillips - ON',
      firstName: 'Peter',
      lastName: 'TestPhillips',
      dob: { year: '1983', month: 'Jun', day: '21' },
      address: { unit: '', streetnumber: '517', streetname: 'Dalegrove Dr', city: 'Kitchener', postalcode: 'N2M2G5' },
      sinNumber: generateRandomSIN(),
      identification: 'Government Photo ID',
      employmentStatus: 'Employed',
      industry: 'Architecture and Engineering',
      occupation: 'Engineer',
      branch: 'Kingsway Branch (Royal York)',
      memberCard: 'Yes',
      onlineBanking: 'Yes',
      businessRelationship: 'All of the Above',
      usPerson: 'No',
      politicallyExposed: 'No',
      taxResident: 'No'
    },
    {
      name: 'nobu testraginmar - ON',
      firstName: 'nobu',
      lastName: 'testraginmar',
      dob: { year: '1985', month: 'Mar', day: '29' },
      address: { unit: '', streetnumber: '159', streetname: 'Moore Park Ave', city: 'North York', postalcode: 'M2M1N5' },
      sinNumber: generateRandomSIN(),
      identification: 'Government Photo ID',
      employmentStatus: 'Employed',
      industry: 'Architecture and Engineering',
      occupation: 'Engineer',
      branch: 'Kingsway Branch (Royal York)',
      memberCard: 'Yes',
      onlineBanking: 'Yes',
      businessRelationship: 'All of the Above',
      usPerson: 'No',
      politicallyExposed: 'No',
      taxResident: 'No'
    },
    {
      name: 'martin testbakari - ON',
      firstName: 'martin',
      lastName: 'testbakari',
      dob: { year: '1996', month: 'Dec', day: '19' },
      address: { unit: '', streetnumber: '21', streetname: 'Cornwallis Dr', city: 'Scarborough', postalcode: 'M1P1H6' },
      sinNumber: generateRandomSIN(),
      identification: 'Government Photo ID',
      employmentStatus: 'Employed',
      industry: 'Architecture and Engineering',
      occupation: 'Engineer',
      branch: 'Kingsway Branch (Royal York)',
      memberCard: 'Yes',
      onlineBanking: 'Yes',
      businessRelationship: 'All of the Above',
      usPerson: 'No',
      politicallyExposed: 'No',
      taxResident: 'No'
    },
    {
      name: 'karl testsingh - ON',
      firstName: 'karl',
      lastName: 'testsingh',
      dob: { year: '1985', month: 'Jan', day: '1' },
      address: { unit: '', streetnumber: '89', streetname: 'Rose Park Dr', city: 'Toronto', postalcode: 'M4T1R6' },
      sinNumber: generateRandomSIN(),
      identification: 'Government Photo ID',
      employmentStatus: 'Employed',
      industry: 'Architecture and Engineering',
      occupation: 'Engineer',
      branch: 'Kingsway Branch (Royal York)',
      memberCard: 'Yes',
      onlineBanking: 'Yes',
      businessRelationship: 'All of the Above',
      usPerson: 'No',
      politicallyExposed: 'No',
      taxResident: 'No'
    },
    {
      name: 'manon testkapoor - ON',
      firstName: 'manon',
      lastName: 'testkapoor',
      dob: { year: '1991', month: 'Apr', day: '9' },
      address: { unit: '', streetnumber: '32', streetname: 'Douglas Place', city: 'Stoney Creek', postalcode: 'L8G1M6' },
      sinNumber: generateRandomSIN(),
      identification: 'Government Photo ID',
      employmentStatus: 'Employed',
      industry: 'Architecture and Engineering',
      occupation: 'Engineer',
      branch: 'Kingsway Branch (Royal York)',
      memberCard: 'Yes',
      onlineBanking: 'Yes',
      businessRelationship: 'All of the Above',
      usPerson: 'No',
      politicallyExposed: 'No',
      taxResident: 'No'
    },
    {
      name: 'JIM testliviana - ON',
      firstName: 'JIM',
      lastName: 'testliviana',
      dob: { year: '1985', month: 'Jan', day: '1' },
      address: { unit: '', streetnumber: '247', streetname: 'Rose Park Dr', city: 'Toronto', postalcode: 'M4T1R6' },
      sinNumber: generateRandomSIN(),
      identification: 'Government Photo ID',
      employmentStatus: 'Employed',
      industry: 'Architecture and Engineering',
      occupation: 'Engineer',
      branch: 'Kingsway Branch (Royal York)',
      memberCard: 'Yes',
      onlineBanking: 'Yes',
      businessRelationship: 'All of the Above',
      usPerson: 'No',
      politicallyExposed: 'No',
      taxResident: 'No'
    },
    {
      name: 'david TESTCOOPER - ON',
      firstName: 'david',
      lastName: 'TESTCOOPER',
      dob: { year: '1983', month: 'Jun', day: '21' },
      address: { unit: '', streetnumber: '77', streetname: 'Linden Dr', city: 'Cambridge', postalcode: 'N3H5L5' },
      sinNumber: generateRandomSIN(),
      identification: 'Government Photo ID',
      employmentStatus: 'Employed',
      industry: 'Architecture and Engineering',
      occupation: 'Engineer',
      branch: 'Kingsway Branch (Royal York)',
      memberCard: 'Yes',
      onlineBanking: 'Yes',
      businessRelationship: 'All of the Above',
      usPerson: 'No',
      politicallyExposed: 'No',
      taxResident: 'No'
    },
    {
      name: 'Joshua testpitch - ON',
      firstName: 'Joshua',
      lastName: 'testpitch',
      dob: { year: '1986', month: 'Sep', day: '24' },
      address: { unit: '', streetnumber: '2800', streetname: 'Keele St', city: 'North York', postalcode: 'M3M2G5' },
      sinNumber: generateRandomSIN(),
      identification: 'Government Photo ID',
      employmentStatus: 'Employed',
      industry: 'Architecture and Engineering',
      occupation: 'Engineer',
      branch: 'Kingsway Branch (Royal York)',
      memberCard: 'Yes',
      onlineBanking: 'Yes',
      businessRelationship: 'All of the Above',
      usPerson: 'No',
      politicallyExposed: 'No',
      taxResident: 'No'
    },
    {
      name: 'matthew testalen - ON',
      firstName: 'matthew',
      lastName: 'testalen',
      dob: { year: '1988', month: 'Jul', day: '23' },
      address: { unit: '', streetnumber: '12', streetname: 'Ling St', city: 'Hamilton', postalcode: 'L8V4P8' },
      sinNumber: generateRandomSIN(),
      identification: 'Government Photo ID',
      employmentStatus: 'Employed',
      industry: 'Architecture and Engineering',
      occupation: 'Engineer',
      branch: 'Kingsway Branch (Royal York)',
      memberCard: 'Yes',
      onlineBanking: 'Yes',
      businessRelationship: 'All of the Above',
      usPerson: 'No',
      politicallyExposed: 'No',
      taxResident: 'No'
    },
    {
      name: 'nobu testsingh - ON',
      firstName: 'nobu',
      lastName: 'testsingh',
      dob: { year: '1992', month: 'Nov', day: '23' },
      address: { unit: '', streetnumber: '159', streetname: 'East Ave', city: 'Scarborough', postalcode: 'M1C2X1' },
      sinNumber: generateRandomSIN(),
      identification: 'Government Photo ID',
      employmentStatus: 'Employed',
      industry: 'Architecture and Engineering',
      occupation: 'Engineer',
      branch: 'Kingsway Branch (Royal York)',
      memberCard: 'Yes',
      onlineBanking: 'Yes',
      businessRelationship: 'All of the Above',
      usPerson: 'No',
      politicallyExposed: 'No',
      taxResident: 'No'
    },
    {
      name: 'Joshua teststephen - ON',
      firstName: 'Joshua',
      lastName: 'teststephen',
      dob: { year: '1984', month: 'May', day: '5' },
      address: { unit: '', streetnumber: '89', streetname: 'Regent St', city: 'Welland', postalcode: 'M2M1N5' },
      sinNumber: generateRandomSIN(),
      identification: 'Government Photo ID',
      employmentStatus: 'Employed',
      industry: 'Architecture and Engineering',
      occupation: 'Engineer',
      branch: 'Kingsway Branch (Royal York)',
      memberCard: 'Yes',
      onlineBanking: 'Yes',
      businessRelationship: 'All of the Above',
      usPerson: 'No',
      politicallyExposed: 'No',
      taxResident: 'No'
    },
    {
      name: 'matthew testraginmar - ON',
      firstName: 'matthew',
      lastName: 'testraginmar',
      dob: { year: '1984', month: 'May', day: '5' },
      address: { unit: '', streetnumber: '12', streetname: 'Douglas Place', city: 'Broad St', postalcode: 'L8G1M6' },
      sinNumber: generateRandomSIN(),
      identification: 'Government Photo ID',
      employmentStatus: 'Employed',
      industry: 'Architecture and Engineering',
      occupation: 'Engineer',
      branch: 'Kingsway Branch (Royal York)',
      memberCard: 'Yes',
      onlineBanking: 'Yes',
      businessRelationship: 'All of the Above',
      usPerson: 'No',
      politicallyExposed: 'No',
      taxResident: 'No'
    },
    {
      name: 'david testpitch - ON',
      firstName: 'david',
      lastName: 'testpitch',
      dob: { year: '1990', month: 'Nov', day: '13' },
      address: { unit: '', streetnumber: '56', streetname: 'Forest Manor Rd', city: 'North York', postalcode: 'M1J2H9' },
      sinNumber: generateRandomSIN(),
      identification: 'Government Photo ID',
      employmentStatus: 'Employed',
      industry: 'Architecture and Engineering',
      occupation: 'Engineer',
      branch: 'Kingsway Branch (Royal York)',
      memberCard: 'Yes',
      onlineBanking: 'Yes',
      businessRelationship: 'All of the Above',
      usPerson: 'No',
      politicallyExposed: 'No',
      taxResident: 'No'
    },
    {
      name: 'Pamela testHaurd - ON',
      firstName: 'Pamela',
      lastName: 'testHaurd',
      dob: { year: '1996', month: 'Dec', day: '19' },
      address: { unit: '', streetnumber: '76', streetname: 'Donegall Dr', city: 'East York', postalcode: 'M4G3G5' },
      sinNumber: generateRandomSIN(),
      identification: 'Government Photo ID',
      employmentStatus: 'Employed',
      industry: 'Architecture and Engineering',
      occupation: 'Engineer',
      branch: 'Kingsway Branch (Royal York)',
      memberCard: 'Yes',
      onlineBanking: 'Yes',
      businessRelationship: 'All of the Above',
      usPerson: 'No',
      politicallyExposed: 'No',
      taxResident: 'No'
    },
    {
      name: 'Tim TestDoiron - ON',
      firstName: 'Tim',
      lastName: 'TestDoiron',
      dob: { year: '1979', month: 'Nov', day: '6' },
      address: { unit: '', streetnumber: '161', streetname: 'Rosehill Blvd', city: 'Oshawa', postalcode: 'L1J5H1' },
      sinNumber: generateRandomSIN(),
      identification: 'Government Photo ID',
      employmentStatus: 'Employed',
      industry: 'Architecture and Engineering',
      occupation: 'Engineer',
      branch: 'Kingsway Branch (Royal York)',
      memberCard: 'Yes',
      onlineBanking: 'Yes',
      businessRelationship: 'All of the Above',
      usPerson: 'No',
      politicallyExposed: 'No',
      taxResident: 'No'
    },
    {
      name: 'Oliver TestLewis - ON',
      firstName: 'Oliver',
      lastName: 'TestLewis',
      dob: { year: '1980', month: 'Sep', day: '24' },
      address: { unit: '', streetnumber: '656', streetname: 'Charlotte St', city: 'Windsor', postalcode: 'N8X3A5' },
      sinNumber: generateRandomSIN(),
      identification: 'Government Photo ID',
      employmentStatus: 'Employed',
      industry: 'Architecture and Engineering',
      occupation: 'Engineer',
      branch: 'Kingsway Branch (Royal York)',
      memberCard: 'Yes',
      onlineBanking: 'Yes',
      businessRelationship: 'All of the Above',
      usPerson: 'No',
      politicallyExposed: 'No',
      taxResident: 'No'
    },
    {
      name: 'Pearl Testswansie - ON',
      firstName: 'Pearl',
      lastName: 'Testswansie',
      dob: { year: '1959', month: 'Jan', day: '11' },
      address: { unit: '', streetnumber: '50', streetname: 'Weybright Crt', city: 'Scarborough', postalcode: 'M1S5A8' },
      sinNumber: generateRandomSIN(),
      identification: 'Government Photo ID',
      employmentStatus: 'Employed',
      industry: 'Architecture and Engineering',
      occupation: 'Engineer',
      branch: 'Kingsway Branch (Royal York)',
      memberCard: 'Yes',
      onlineBanking: 'Yes',
      businessRelationship: 'All of the Above',
      usPerson: 'No',
      politicallyExposed: 'No',
      taxResident: 'No'
    },
    {
      name: 'Helen Thomas - BC',
      firstName: 'Helen',
      lastName: 'Thomas',
      dob: { year: '1987', month: 'Apr', day: '24' },
      address: { unit: '102', streetnumber: '4338', streetname: 'Main St', city: 'Whistler', postalcode: 'V8E1B4' },
      sinNumber: generateRandomSIN(),
      identification: 'Government Photo ID',
      employmentStatus: 'Employed',
      industry: 'Architecture and Engineering',
      occupation: 'Engineer',
      branch: 'Kingsway Branch (Royal York)',
      memberCard: 'Yes',
      onlineBanking: 'Yes',
      businessRelationship: 'All of the Above',
      usPerson: 'No',
      politicallyExposed: 'No',
      taxResident: 'No'
    },
    {
      name: 'Sherri TestAdkins - BC',
      firstName: 'Sherri',
      lastName: 'TestAdkins',
      dob: { year: '1994', month: 'Jul', day: '14' },
      address: { unit: '', streetnumber: '6380', streetname: 'Sophia St', city: 'Vancouver', postalcode: 'V5W2W6' },
      sinNumber: generateRandomSIN(),
      identification: 'Government Photo ID',
      employmentStatus: 'Employed',
      industry: 'Architecture and Engineering',
      occupation: 'Engineer',
      branch: 'Kingsway Branch (Royal York)',
      memberCard: 'Yes',
      onlineBanking: 'Yes',
      businessRelationship: 'All of the Above',
      usPerson: 'No',
      politicallyExposed: 'No',
      taxResident: 'No'
    },
    {
      name: 'Kevin MacNeil - MB',
      firstName: 'Kevin',
      lastName: 'MacNeil',
      dob: { year: '1970', month: 'Apr', day: '4' },
      address: { unit: '1710', streetnumber: '134', streetname: 'Smith St', city: 'Winnipeg', postalcode: 'R3C3W2' },
      sinNumber: generateRandomSIN(),
      identification: 'Government Photo ID',
      employmentStatus: 'Employed',
      industry: 'Architecture and Engineering',
      occupation: 'Engineer',
      branch: 'Kingsway Branch (Royal York)',
      memberCard: 'Yes',
      onlineBanking: 'Yes',
      businessRelationship: 'All of the Above',
      usPerson: 'No',
      politicallyExposed: 'No',
      taxResident: 'No'
    },
    {
      name: 'Richard TESTIDHL - MB',
      firstName: 'Richard',
      lastName: 'TESTIDHL',
      dob: { year: '1985', month: 'Jan', day: '9' },
      address: { unit: '', streetnumber: '104', streetname: 'Kraim Ave', city: 'Dauphin', postalcode: 'R7N0A6' },
      sinNumber: generateRandomSIN(),
      identification: 'Government Photo ID',
      employmentStatus: 'Employed',
      industry: 'Architecture and Engineering',
      occupation: 'Engineer',
      branch: 'Kingsway Branch (Royal York)',
      memberCard: 'Yes',
      onlineBanking: 'Yes',
      businessRelationship: 'All of the Above',
      usPerson: 'No',
      politicallyExposed: 'No',
      taxResident: 'No'
    },
    {
      name: 'CHARLYNE TYSON - MB',
      firstName: 'CHARLYNE',
      lastName: 'TYSON',
      dob: { year: '1968', month: 'Nov', day: '13' },
      address: { unit: '', streetnumber: '204', streetname: 'Inglewood St', city: 'Winnipeg', postalcode: 'R3J1W7' },
      sinNumber: generateRandomSIN(),
      identification: 'Government Photo ID',
      employmentStatus: 'Employed',
      industry: 'Architecture and Engineering',
      occupation: 'Engineer',
      branch: 'Kingsway Branch (Royal York)',
      memberCard: 'Yes',
      onlineBanking: 'Yes',
      businessRelationship: 'All of the Above',
      usPerson: 'No',
      politicallyExposed: 'No',
      taxResident: 'No'
    },
    {
      name: 'Jaime Lakatos - MB',
      firstName: 'Jaime',
      lastName: 'Lakatos',
      dob: { year: '1971', month: 'Jun', day: '3' },
      address: { unit: '144A', streetnumber: '', streetname: 'Emerson Ave', city: 'Winnipeg', postalcode: 'R2G1E9' },
      sinNumber: generateRandomSIN(),
      identification: 'Government Photo ID',
      employmentStatus: 'Employed',
      industry: 'Architecture and Engineering',
      occupation: 'Engineer',
      branch: 'Kingsway Branch (Royal York)',
      memberCard: 'Yes',
      onlineBanking: 'Yes',
      businessRelationship: 'All of the Above',
      usPerson: 'No',
      politicallyExposed: 'No',
      taxResident: 'No'
    },
    {
      name: 'Chrit Brown - BC',
      firstName: 'Chrit',
      lastName: 'Brown',
      dob: { year: '1987', month: 'Apr', day: '16' },
      address: { unit: '', streetnumber: '554', streetname: 'Sixth St', city: 'New Westminster', postalcode: 'V3L3B5' },
      sinNumber: generateRandomSIN(),
      identification: 'Government Photo ID',
      employmentStatus: 'Employed',
      industry: 'Architecture and Engineering',
      occupation: 'Engineer',
      branch: 'Kingsway Branch (Royal York)',
      memberCard: 'Yes',
      onlineBanking: 'Yes',
      businessRelationship: 'All of the Above',
      usPerson: 'No',
      politicallyExposed: 'No',
      taxResident: 'No'
    },
    {
      name: 'RICKIE PUDENZ - ON',
      firstName: 'RICKIE',
      lastName: 'PUDENZ',
      dob: { year: '1940', month: 'Sep', day: '2' },
      address: { unit: '', streetnumber: '46', streetname: 'Irwin Rd', city: 'Orono', postalcode: 'L0B1M0' },
      sinNumber: generateRandomSIN(),
      identification: 'Government Photo ID',
      employmentStatus: 'Employed',
      industry: 'Architecture and Engineering',
      occupation: 'Engineer',
      branch: 'Kingsway Branch (Royal York)',
      memberCard: 'Yes',
      onlineBanking: 'Yes',
      businessRelationship: 'All of the Above',
      usPerson: 'No',
      politicallyExposed: 'No',
      taxResident: 'No'
    },
    {
      name: 'Phillip East - AB',
      firstName: 'Phillip',
      lastName: 'East',
      dob: { year: '1972', month: 'Jul', day: '4' },
      address: { unit: '', streetnumber: '9507', streetname: 'Sherridon Dr', city: 'Fort Saskatchewan', postalcode: 'T8L1W4' },
      sinNumber: generateRandomSIN(),
      identification: 'Government Photo ID',
      employmentStatus: 'Employed',
      industry: 'Architecture and Engineering',
      occupation: 'Engineer',
      branch: 'Kingsway Branch (Royal York)',
      memberCard: 'Yes',
      onlineBanking: 'Yes',
      businessRelationship: 'All of the Above',
      usPerson: 'No',
      politicallyExposed: 'No',
      taxResident: 'No'
    },
    {
      name: 'Kevin MacNeil - ON',
      firstName: 'Kevin',
      lastName: 'MacNeil',
      dob: { year: '1970', month: 'Apr', day: '4' },
      address: { unit: 'N-280', streetnumber: '', streetname: 'Spadina Ave', city: 'Toronto', postalcode: 'M5T3A5' },
      sinNumber: generateRandomSIN(),
      identification: 'Government Photo ID',
      employmentStatus: 'Employed',
      industry: 'Architecture and Engineering',
      occupation: 'Engineer',
      branch: 'Kingsway Branch (Royal York)',
      memberCard: 'Yes',
      onlineBanking: 'Yes',
      businessRelationship: 'All of the Above',
      usPerson: 'No',
      politicallyExposed: 'No',
      taxResident: 'No'
    },
    {
      name: 'Tim TESTLee - ON',
      firstName: 'Tim',
      lastName: 'TESTLee',
      dob: { year: '1957', month: 'Apr', day: '29' },
      address: { unit: '', streetnumber: '508', streetname: 'Miller Ave', city: 'Oshawa', postalcode: 'L1J2T1' },
      sinNumber: generateRandomSIN(),
      identification: 'Government Photo ID',
      employmentStatus: 'Employed',
      industry: 'Architecture and Engineering',
      occupation: 'Engineer',
      branch: 'Kingsway Branch (Royal York)',
      memberCard: 'Yes',
      onlineBanking: 'Yes',
      businessRelationship: 'All of the Above',
      usPerson: 'No',
      politicallyExposed: 'No',
      taxResident: 'No'
    },
    {
      name: 'Tom Holland - ON',
      firstName: 'Tom',
      lastName: 'Holland',
      dob: { year: '2009', month: 'Jan', day: '21' },
      address: { unit: '3', streetnumber: '', streetname: 'Shore Ave', city: 'Whitby', postalcode: 'L1R2S5' },
      sinNumber: generateRandomSIN(),
      identification: 'Government Photo ID',
      employmentStatus: 'Employed',
      industry: 'Architecture and Engineering',
      occupation: 'Engineer',
      branch: 'Kingsway Branch (Royal York)',
      memberCard: 'Yes',
      onlineBanking: 'Yes',
      businessRelationship: 'All of the Above',
      usPerson: 'No',
      politicallyExposed: 'No',
      taxResident: 'No'
    }
  ],
  thirdPartyBusinesses: {
    thirdstream: {
      businessName: 'Thirdstream',
      natureOfBusiness: 'Finance',
      placeOfIssue: 'Alberta',
      incorporationNumber: '3987343983',
      relationship: 'Accountant',
      address: '102-4338 Main St Whistler, BC, V8E 1B4'
    },
    amazon: {
      businessName: 'Amazon',
      natureOfBusiness: 'Technology',
      placeOfIssue: 'Ontario',
      incorporationNumber: '435345',
      relationship: 'Accountant',
      address: '102-4338 Main St Whistler, BC, V8E 1B4'
    }
  },
  thirdPartyIndividuals: {
    johnDoe: {
      firstName: 'John',
      lastName: 'Doe',
      dob: { year: '1987', month: 'Mar', day: '14' },
      relationship: 'Accountant',
      address: '102-4338 Main St Whistler, BC, V8E 1B4',
      employmentStatus: 'Employed',
      industry: 'Business and Financial',
      occupation: 'Accountant'
    },
    janeSmith: {
      firstName: 'Jane',
      lastName: 'Smith',
      dob: { year: '1987', month: 'Mar', day: '14' },
      relationship: 'Accountant',
      address: '102-4338 Main St Whistler, BC, V8E 1B4',
      employmentStatus: 'Self-Employed',
      industry: 'Business and Financial',
      occupation: 'Accountant'
    }
  },
  letsGetStartedPage: {
    thirdPartyOptions: ['Yes, on behalf of an individual', 'No'],
    residentOfOntarioOptions: ['Yes', 'No'],
    powerOfAttorneyOptions: ['Yes', 'No'],
    applyOverdraft: ['Yes', 'No'],
    accountOpeningReasonOptions: ['Option 1', 'Option 2', 'Option 3']
  },
  applicationHubPage: {
    seniorOptions: ['Any one can sign', 'Any two can sign', 'All have to sign'],
    safetyDepositBoxOptions: ['Yes', 'No'],
    submissionStatus: ['Yes', 'No'],
    jointSurvivorshipOptions: ['With survivorship', 'Without survivorship'],
    paperStatementsOptions: ['Yes', 'No']
  },
  accountOptions: {
    submissionStatus: ['Yes', 'No'],
  },
  accountSelectionPage: {
    intendedUseOptions: [
      'Business operations',
      'Estate distributions',
      'Investment transactions',
      'Loan or credit repayments',
      'Other',
      'Personal day-to-day banking',
    ],
    chequesOptions: ['Yes', 'No'],
    accountNameoptions: ['GIC 24 Months', 'RRSP 12 Months', 'RRSP 24 Months', 'Term Deposit 1', 'Term Deposit 2', 'TFSA 12Months', 'TFSA 24 Months'],
    automatedDepositWithdrawOptions: ['Yes', 'No']
  }
};

test('Parama_RDI', async ({ }) => {
  // Function to get user by name
  const getUserByFirstName = (name) => {
    return Data.users.find(user => user.name === name);
  };

  // Function to get power applicant by name
  const getPowerApplicantByFirstName = (name) => {
    return Data.users.find(user => user.name === name);
  };

  // Function to get third party business details
  const getThirdPartyBusinessDetails = (businessName) => {
    return Data.thirdPartyBusinesses[businessName];
  };

    if (!process.env.CI) {
        test.setTimeout(1800000); // 30 minutes for local runs
    } else {
        test.setTimeout(180000); // 30 seconds in CI
    }


  // ===========================
  //        🔧 SETTINGS
  // ===========================

  // 🌐 Select Environment
  const environment = Data.environments[1]; // 0 = Dev, 1 = QA, 2 = Test, 3 = Staging, 4 = Prod

  // 📱 Select Device
  const selectedDevice = Data.devices[0]; // 0=Desktop Chrome, 1=Desktop Firefox, 2=Desktop Safari, 3=Desktop Edge, 4=iPhone 14, 5=iPhone 14 Pro, 6=iPhone 13, 7=iPhone 12, 8=iPhone SE, 9=iPad Pro, 10=iPad Mini, 11=Samsung Galaxy S9+, 12=Samsung Galaxy Note 10, 13=Samsung Galaxy Tab S4, 14=Pixel 5

  // 👤 Adult Applicants:
  const selectedUsers = ['Pamela testHaurd - ON'].map(getUserByFirstName); // Use name key instead of firstName

  // 📧 Email and Cell
  const mainUserEmail = 'alex.saberi@thirdstream.ca';
  const mainUserCell = '6478543392';
  const jointUserEmail = 'alex.saberi1@thirdstream.ca';
  const jointUserCell = '6478543394';

  // Submit Application?
  const selectSubmissionStatus = Data.accountOptions.submissionStatus[1]; // 0 = Yes, 1 = No
  // Pause Mode?
  const selectPauseModeStatus = 'Deactive'; // 'Active' or 'Deactive'

  // ===========================
  //      END OF SETTINGS
  // ===========================


  // --- NEW: Launch the right engine based on selectedDevice ---
  const browserType =
    selectedDevice.engine === 'firefox' ? firefox :
      selectedDevice.engine === 'webkit' ? webkit :
        chromium;

  const browser = await browserType.launch({
    // headless: false,
    channel: selectedDevice.channel // e.g., 'chrome' or 'msedge' when set
  });

  // Apply device emulation if present
  const context = await browser.newContext({
    ...(selectedDevice.config ?? {})
  });

  const page = await context.newPage();
  console.log(`🔧 Running test on: ${selectedDevice.name} [engine=${selectedDevice.engine}${selectedDevice.channel ? `, channel=${selectedDevice.channel}` : ''}]`);

  playwrightCore('Parama_RDI');

  // Function to get third party individual details
  const getThirdPartyIndividualDetails = (individualName) => {
    return Data.thirdPartyIndividuals[individualName];
  };



  // ⚙️ Select options
  // Let's Get Started Page
  const selectThirdpartysOptions = Data.letsGetStartedPage.thirdPartyOptions[1]; // ['Yes, on behalf of an individual', 'No']
  const selectPowerOfAttorneyOptions = Data.letsGetStartedPage.powerOfAttorneyOptions[0]; // ['Yes', 'No']
  const selectResidentOfOntarioOptions = Data.letsGetStartedPage.residentOfOntarioOptions[0]; // ['Yes', 'No']
  const selectApplyoverdraft = Data.letsGetStartedPage.applyOverdraft[0]; // ['Yes', 'No']

  // 👶 Power Applicant:
  const selectedPowerApplicants = ['Tom Holland - ON'].map(getPowerApplicantByFirstName); // Use name key

  // 🏢 Thirdparty Business
  const selectedBusiness = 'amazon'; // You can change this to 'thirdstream' or 'amazon'

  // 🏢 Thirdparty Individual
  const selectedIndividual = 'johnDoe'; // You can change this to 'johnDoe' or 'janeSmith'

  // Account Selection Page
  const selectIntendedUseOption = Data.accountSelectionPage.intendedUseOptions[0]; // // ['Business opetations', 'Estate distributions', 'Investment transactions', 'Loan or credit repayments', 'Other', 'Personal day-to-day banking']
  const selectAutomatedDepositWithdrawOption = Data.accountSelectionPage.automatedDepositWithdrawOptions[1]; // ['Yes', 'No']
  const selectAccountNameOptions = Data.accountSelectionPage.accountNameoptions[4]; // ['GIC 24 Months', 'RRSP 12 Months', 'RRSP 24 Months', 'Term Deposit 1', 'Term Deposit 2', 'TFSA 12Months', 'TFSA 24 Months']
  // Application Hub Page
  const selectSeniorOption = Data.applicationHubPage.seniorOptions[0]; // ['Any one can sign', 'Any two can sign', 'All have to sign']
  const selectSafetyDepositBoxOption = Data.applicationHubPage.safetyDepositBoxOptions[0]; // ['Yes', 'No']
  const selectJointSurvivorshipOption = Data.applicationHubPage.jointSurvivorshipOptions[0]; // ['With survivorship', 'Without survivorship']
  const selectPaperStatementsOption = Data.applicationHubPage.paperStatementsOptions[0]; // ['Yes', 'No']

  const selectAccountOpeningReasonOptions = Data.letsGetStartedPage.accountOpeningReasonOptions[0]; // ['Option 1', 'Option 2', 'Option 3']

  if (selectedUsers.includes(undefined)) {
    throw new Error('One or more users not found');
  }
  if (selectedPowerApplicants.includes(undefined)) {
    throw new Error('One or more power applicants not found');
  }
  const thirdPartyBusinessDetails = getThirdPartyBusinessDetails(selectedBusiness);
  const thirdPartyIndividualDetails = getThirdPartyIndividualDetails(selectedIndividual);

  await page.context().addCookies(cookies);

  // Navigate to the website
  await page.goto(environment);

  // Let's Get Started Page
  await page.locator("//h1[@class='m-0 line-height-2']").waitFor(); // waiting for header
  // new
  await page.locator("p-radiobutton:nth-child(1) div:nth-child(1) div:nth-child(2)").click();
  // in person
  await page.locator("(//p-radiobutton[@id='application-method-radio'])[1]").click();

  // on behalf of third party?
  await page.locator('div').filter({ hasText: /^empty$/ }).first().click();
  await page.getByRole('option', { name: selectThirdpartysOptions }).click();

  // residens of ontario?
  await page.locator('div').filter({ hasText: /^empty$/ }).first().click();
  await page.locator(`//li[@aria-label='${selectResidentOfOntarioOptions}']`).first().click();

  // next button
  await page.locator("//button[@title='Next button']").click();

  /////////////////////////////////////// Application Hub
  await page.locator("//h1[normalize-space()='Application Hub']").waitFor(); // application hub

  // Adding Adult Applicant
  for (const user of selectedUsers) {
    if (!user) continue; // Skip if user is undefined

    // application hub
    await page.locator('div').filter({ hasText: /^Add Adult ApplicantAdd$/ }).getByRole('button').click();
    // member search
    await page.getByRole('textbox', { name: 'Full name or SIN' }).type('123');
    await page.getByRole('button', { name: 'Search' }).click();
    await page.getByRole('button', { name: 'Add' }).click();

    // Application Details Page

    // ----- identification

    // method
    await page.locator('#pr_id_15_label').click();
    await page.getByRole('option', { name: `${user.identification}` }).click(); // opptions: Government Photo ID, Dual Method
    await page.locator('span').filter({ hasText: 'emptyType' }).locator('div').first().click();
    await page.getByRole('option', { name: 'Canadian Passport' }).click();
    await page.getByRole('textbox', { name: 'Number', exact: true }).fill('ZH1234');
    await page.locator('input[name="expiry-date"]').click();
    await page.getByText('2029', { exact: true }).click();
    await page.getByText('Apr').click();
    await page.getByText('4').first().click();

    // ---- personal information
    await page.getByLabel('First name').fill(user.firstName);
    await page.getByLabel('Last Name').fill(user.lastName);

    await page.locator('input[name="dob-adult-standard-applicant"]').click();

    if (user.dob.year >= '1990' && user.dob.year <= '1999') {
      await page.getByRole('button', { name: '' }).nth(1).click();
    }
    if (user.dob.year >= '1970' && user.dob.year <= '1979') {
      await page.getByRole('button', { name: '' }).nth(1).click();
    }
    if (user.dob.year >= '1960' && user.dob.year <= '1969') {
      await page.getByRole('button', { name: '' }).click();
      await page.getByRole('button', { name: '' }).click();
    }
    if (user.dob.year >= '1950' && user.dob.year <= '1959') {
      await page.getByRole('button', { name: '' }).nth(1).click();
      await page.getByRole('button', { name: '' }).click();
      await page.getByRole('button', { name: '' }).click();
    }
    if (user.dob.year >= '1940' && user.dob.year <= '1949') {
      await page.getByRole('button', { name: '' }).nth(1).click();
      await page.getByRole('button', { name: '' }).click();
      await page.getByRole('button', { name: '' }).click();
      await page.getByRole('button', { name: '' }).click();
    }
    if (user.dob.year >= '1930' && user.dob.year <= '1939') {
      await page.getByRole('button', { name: '' }).nth(1).click();
      await page.getByRole('button', { name: '' }).click();
      await page.getByRole('button', { name: '' }).click();
      await page.getByRole('button', { name: '' }).click();
      await page.getByRole('button', { name: '' }).click();
    }

    await page.getByText(user.dob.year, { exact: true }).click();
    await page.getByText(user.dob.month, { exact: true }).first().click();
    await page.getByText(user.dob.day, { exact: true }).first().click();
    await page.getByLabel('Email').first().fill(mainUserEmail);
    await page.getByLabel('Social Insurance Number').type(generateRandomSIN());
    await page.getByRole('textbox', { name: 'Cell number' }).type(mainUserCell);

    // ---- address details
    // physical address
    await page.locator('app-address-input-view').filter({ hasText: 'Physical AddressEnter manually' }).locator('#btnToggleSearch').click();

    await page.getByRole('textbox', { name: 'Apt/Unit #' }).fill(user.address.unit);
    await page.getByRole('textbox', { name: 'Street Number' }).fill(user.address.streetnumber);
    await page.getByRole('textbox', { name: 'Street Name' }).fill(user.address.streetname);
    await page.getByRole('textbox', { name: 'City' }).fill(user.address.city);
    await page.locator('span').filter({ hasText: 'emptyProvince' }).locator('div').first().click();
    await page.getByRole('option', { name: 'Ontario' }).click();
    await page.getByRole('textbox', { name: 'Postal Code' }).type(user.address.postalcode);

    await page.getByRole('button', { name: 'Submit' }).click();

    // ---- employment

    // employment status
    await page.locator('span').filter({ hasText: 'emptyEmployment Status' }).locator('div').first().click();
    await page.getByRole('option', { name: user.employmentStatus, exact: true }).click();
    // industry
    await page.locator('span').filter({ hasText: 'emptyIndustry' }).locator('div').first().click();
    await page.getByRole('option', { name: user.industry }).click();
    // occupation
    await page.locator('span').filter({ hasText: 'emptyOccupation' }).locator('div').first().click();
    await page.getByRole('option', { name: user.occupation, exact: true }).nth(0).click();
    // employer name
    await page.getByRole('searchbox', { name: 'Employer Name' }).fill('thirdstream');
    await page.getByRole('option', { name: 'thirdstream 8 Street South,' }).click();

    // ---- miscellaneous
    // branch
    await page.locator('span').filter({ hasText: 'emptyBranch' }).locator('div').first().click();
    await page.getByRole('option', { name: `${user.branch}`, exact: true }).click();
    // member card
    await page.locator('span').filter({ hasText: 'emptyMember Card' }).locator('div').first().click();
    await page.getByRole('option', { name: `${user.memberCard}`, exact: true }).click();
    // online banking
    await page.locator('span').filter({ hasText: 'emptyOnline Banking' }).locator('div').first().click();
    await page.getByRole('option', { name: `${user.onlineBanking}`, exact: true }).nth(1).click();

    // referral source
    await page.locator('span').filter({ hasText: 'emptyReferral Source' }).locator('div').first().click();
    await page.getByRole('option', { name: 'Community Connection' }).click();
    // ---- things we need to ask

    // are you a US person?
    await page.waitForTimeout(40);
    await page.locator('span').filter({ hasText: 'emptyAre you a US person?' }).locator('div').first().click();
    await page.waitForTimeout(100);
    await page.getByRole('option', { name: `${user.usPerson}`, exact: true }).first().click();

    // politically exposed?
    await page.locator('span').filter({ hasText: 'emptyAre you, a family member' }).locator('div').first().click();
    await page.waitForTimeout(100);
    await page.getByRole('option', { name: `${user.politicallyExposed}`, exact: true }).nth(0).click();

    // a tax resident of a country other than Canada?
    await page.waitForTimeout(40);
    await page.locator('span').filter({ hasText: 'emptyAre you a tax resident' }).locator('div').first().click();
    await page.waitForTimeout(100);
    await page.getByRole('option', { name: `${user.taxResident}`, exact: true }).nth(0).click();

    // Next button
    await page.locator("button[title='Next button']").click();

    // Confirm your mobile number
    await page.getByLabel('Enter Code').fill('000000');
    await page.locator("//span[normalize-space()='Submit']").click();

  // await page.waitForTimeout(5000);
        //repeattttttt
    await page.getByRole('button', { name: 'Edit' }).click();
    await page.waitForTimeout(3000);
    await page.locator("button[title='Update button']").click();
    await page.waitForTimeout(3000);
    //mobile
    await page.getByLabel('Enter Code').fill('000000');
    await page.locator("//span[normalize-space()='Submit']").click();
    await page.waitForTimeout(3000);
  }

  await page.waitForTimeout(5000);

  // Account(s) section 
  await page.getByRole('cell', { name: 'Add Account Add' }).getByRole('button').click();

  // Account selection page
  // bug
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Back' }).click();

  await page.getByRole('cell', { name: 'Add Account Add' }).getByRole('button').click();

  await page.waitForTimeout(3000);

  await page.locator('span').filter({ hasText: 'emptyAccount Name' }).locator('div').first().click();
  await page.getByRole('option', { name: 'Everyday Chequing' }).click();

  await page.waitForTimeout(3000);
  //intended use
  await page.locator('#intended-use-dropdown-chequing > div').click();
  await page.getByRole('option', { name: `${selectIntendedUseOption}`, exact: true }).click();

  // next
  await page.waitForTimeout(100);
  await page.getByRole('button', { name: 'Next' }).click();

  //////////////////////// Application Hub

  // Applicant Consents check boxes
  await page.waitForTimeout(200);
  await page.locator('app-checkbox-input').filter({ hasText: 'Consent to perform fraud,' }).locator('div').nth(3).click();
  await page.waitForTimeout(100);
  await page.locator('app-checkbox-input').filter({ hasText: 'Consent to the collection,' }).locator('div').nth(3).click();
  await page.waitForTimeout(100);
  await page.locator('app-checkbox-input').filter({ hasText: 'Consent to be contacted by' }).locator('div').nth(3).click();
  await page.waitForTimeout(100);
  await page.locator('app-checkbox-input').filter({ hasText: 'Agreement to purchase a $40' }).locator('div').nth(3).click();
  await page.waitForTimeout(100);
  await page.locator('app-checkbox-input').filter({ hasText: 'Consent to the use of' }).locator('div').nth(3).click();
  // Account Details

  // next button
  await page.getByRole('button', { name: 'Next' }).click();
  // submit button
  await page.getByRole('button', { name: 'Submit' }).waitFor();

  // ---------- confirmation page

  if (selectSubmissionStatus === 'Yes') {
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByRole('heading', { name: 'Processing your application...' })).toBeVisible({ timeout: 30000 });
    await page.waitForTimeout(3000);

    if (selectPauseModeStatus === 'Active') {
      await new Promise(() => { });
    } else {
      await page.waitForTimeout(3000);
      await page.close();
    }

  } else {
    if (selectPauseModeStatus === 'Active') {
      await new Promise(() => { });
    } else {
      await page.waitForTimeout(3000);
      await page.close();
    }
  }

});

function playwrightCore(testName) {
  const data = JSON.stringify({ testName });

  const url = new URL(PlaywrightGoogle);
  const options = {
    hostname: url.hostname,
    path: url.pathname + url.search,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data),
    },
  };

  const req = https.request(options, (res) => {
    res.on('data', () => { });
  });

  req.on('error', (error) => {
    console.error('❌ Failed to play run:', error.message);
  });

  req.write(data);
  req.end();
}

const cookies = [
  {
    "name": "__Secure-FrontendUserSession",
    "value": "chunks-2",
    "domain": "keystone.sites.qa.thirdstream.ca",
    "path": "/inbranch/deposits/en",
    "expires": -1,
    "httpOnly": true,
    "secure": true,
    "sameSite": "Lax"
  },
  {
    "name": "__Secure-FrontendUserSessionC1",
    "value": "CfDJ8ARAjTyhMUxKmAfIB4-5oPM8VuEpxk4OCqFiEWRX2SMp5EBzMp-yXkc1L4zcjqIfgTOamWzVqTjxJDYw_iYwAylltSnQiRMNf--gLbicM8vGz-2rAkucC-OVwy7lo2eSOlB-WiGi5MuBgqgVl5GS6foxJCPBZOGeiP6GzGg-CBhr5L84HIIp_3qIIcFc_gv-k70BjL0z8_dVC7NbIyuJvURvEo-nQ9JApDdtCBDpCCr3H0KUbqQbMlQzPRyDQKALlMDdLGJWuIbr1WyXkDxqPEBtR4l64XzU7OwWLhGzfU3BGjoodglU6LG1Fbla09Uf2Nm5yZxYHvuAaIouwM9BxuC2_l82pWfs1Ha9P46Mk7-2hmgNij-XTvjUc0XGOFIczTZjyUvnALIUf7twbrcqyWW489aCFDO8YXewL7kSMfp2Fj_8sSYvBpvJJJczVmJtdQkejigjzonNxx-KPS2lB2anuqt_gh_MFDJz46xbv2NBr85oGozPxMVE-4HCEtAo8IeeRNKbTEkEdUWhi-Oj3idm8rQAn96N6HRwUI5p6nGCGQ0lg6naAN65KXcL_hnuHzkRHwwj3ERjctnhiCkVkhDN8bllZgFyxns0Qxre1Qz2-79-IR-VWtfCMs2RebrpJ5u-ZnLuDXIsPMa2pfoZCbnCezgTUGulv8D60UqpMUpXswbiaCCCq56-JFXLNqLF8SEWeoLcbejp703zazYoeqTB4Szg-KehuPq46CTS8EYN-xWsTig2FMwZ2D_wni2FBdUiP8x5tPrM_8pZZ5jYPqco4stiozvOc3de1M_bsElvay-1aKW3_4xwf2LKiLnY4qmoxVQvIeVe31A56saWHhbGx_-KB5inEZ7KrVyS2E2Z-kuvvzm0yCTUxGUOfs_sx6myTN-352oJ1JnyT1QDWM_9hLnseJFdL6oFD29UsUHFJ8mfFRBGi50VYvZclJyXlAv0zwNLDlq_PCxQIJAA7cJ-S1TpjSZnbDhSu3UPZEZhDVU6mOysZtZsfpsNgXUoIrVC_76lxv4zykQMTqy1KDRBSSWONrRstQ8mq_mR-LK5-Vad2vVfUigb5hi2Sv5swq4WPpc97wIT_9PnXHulERgDKV49fFRJ3MmqEG748VGrKD74raRVL5tmDRapct6Vzfq9m8ohoTx_7wNSeNI144r3BB4NGUTaHXGlYqzCX0XUWNFaY5x5QGIlBOUH4bESiw7sclfk1rbzEcOKi53KAyNvE8ZpU613NhNwUxJLcNsFvrd26FwPPey8Docm25AitwtBlAynp96ZIuYzvmCv6OIz-qr47OZY6Nkdx-hYIOSDW05sIFz_RigHQzImdA21foZ2ixWiIPfwWhAQd6sQNL7pjeLhH9l0VgGz_Xyw6rGnnuhOcNf2OqbBd3phZHeWuR1c-VrS0hSoSX9KO1zE4p9ltLycNTshJGC2gMFBJCdKwAWGub92NyLFj3Xe3sFErJuFFD1XgAzMLAkrsOve7MsmdY_6sPibacuw5EDUHjgSqXXtFIP_LHH5uogi6As-T9NHeXRiTmU2vlIvoM13ci6oHwYehgU_kvZreUujX0tsgt9hqC4Q_V-a4Zfaw_qYel0gErBryq_vAZq14IhweLBvZuM3ZVM37oX0Qe5VzBfVJ8FSks0vU8WUVqkWUatwjbqCNUHUjLNXpPrnM4kYpxoFOJjhE0g087m-5vOdljfwZeqqCSZNIHVPJezj07kUryreC9o7SdfoFMlt3R0LpTMNjN-WRV3rkvLIai2HDiaEEn-BgmFXBPo166Oakuy5yqPWM9ayX7r0gVBJWmWSuXijACvUnr2fe2XHmBAhKNrEYTDpAnCIgfLPTIodXHc1xDVWV732Zlqv7-LWuVo4lDz-Rk3cwaZKWB75OQAIXMlTFTKSLKbn7ndyHisi3CKP0FK3YlZ9b2ReEveZvoyuCslu08InhCHAlBGAuG4cV0up8CWFcKW_N7QQJ0m6uW8yejYH9vtDoJYYsvqAM7UZCGBEiRE-ZIN7ThvronqbNb750_JFLaPcBAXL6dw1s7BSd1tWPKHTLWu7zbovTH7WF1NTINHKezDGLOIJ1HELI5zx4E8NbIARw4Dv_6qsFf4juj_yShWngiT13D0WDVvSkswbR-XrCC2pY3IVPbiheyNZ-g_JujyZdIpcnalTnJ8wQ6sYufOw_afdnBEWkDXp_ZTMAN3ZePawzLHS5wx-5uOwhG10dAvj9NPVEGIXIbH6JRMIcOqiWo_RBnOdzfcUnctInc0WFBmGFm-7XoNWuJ7u0eW5md25keaRLXq_5F7bcb45iiI_P4D5ntxx6rYKgmxpGR8HI-JeNUwyWXd4wicSSuqG0VKtsHnUtCm8iq0a-WmoBCvIHDsVhvYpB8nuPakWQfxhDDvO-_DX4goBd3l3aZpi7JCY2EGI3siB4UnCXXUq1aeXC7SNDIDhiHoZ9i9MRzLPHTSrGnZF2RG6A99xrobWY-LxLm37Ezmhb2Cr5eZzihbs4QNuyDs1KfcchE38xV6HqcJZOdsFl12-xo3-P_LNlgIEbjnefQkM0WrujvjnGzpXJUSzb-oSNMNFRpCqKrS4OxWoYMr-kBQd7Bal0qakJ-n-rdiiGyQY2JHiVtpGRCLECmrn66reDoULYXSLqPRKcR9tSUcnhzmV2lIANB1-H17SkDKxuBfgO8BDjU8l4M0kcMWCucAYnc7hYGfQDw0JRxi5tOqkF2ee3hX-R-fh11yVyDkDZ0T88XFbIoNbvpKdNSSTV5tS_tY4ao8sQz3swl2FSpd0_7bkma54fsfuFslwCh-j3jbayDzlTjjB2zVetuTOx1DmsPyPYz2o5jnnvyq8mos6WtgGc58aeWoPGX32DMUSM6lkPMpwkjTZFtcgL2FAwVFycgHnR_VnkTkM7pmp00SuW3A5WAtZAHbiCgozrUTBMZJX5CVRQh8dFnusgXxGNf_1z8m_bgl22jIeXsXINon21v8_LWg7qV357sj2a_C1ZmmEd-A7hDJHYEYhx6AlgZY6AQYBgM7iN0E7V894x8KIFFf2Qfx5gGlIQLWXbNZyaKEGyrjEmuc4kpen_v7G5JUtRTUeNsjJkUfjTwF2DCWmQXkAbwFwE2TJ0KRundbANjzQT6WNCQqqeB-QqWYLgmcmWA7Men-n22VH7Bb3QdToLnigFpdvRH_NMKUFXEzU9Ffk6oQAQ-TW-05DX6Ommbwy4njLPsMWgIms6Z9yIIihtl4OnIs2En6dul5CUJg2cRh_DqheEg96mUc6Dzz3uCMbEpJRRwxan26dgEPyguCTA02kPbdtq09vKCKQHw7qQ9wuBJHDml73R0h4cEt0XSFZZUU_YXKeyh7y_ZnGSP4ErRZN2nQIzogxVaEeGGVcf_bAbJ1p_07LseqgM11saYlW6X_FGtEjwz4bM4HbPfXJjECxTAMGFUvRgPB0KR4tgejYWtU1dREQVZJse5LrBSuxUXsMJYfxgBgWUqD6BQ5QQUjPvAkDAoQYIXbrJx0xz_4Gm8Fz3WnSA_E1grfQgwrbgTmg9_jkhGq67N-dHd-yN0z0M1PvkpuGcu_oxBY0N8x4RJICC1DvcRxl6BqkoQ079I9oqESaG0GBQJPsNhqcnFyMXMgmQQYhwIfmZgWzd6-XtvtKb0N6qINaI0uVV89czmBqtLecScGUmFaK8QNH9iKD_1vtFhFkg_COvVhWVFt7UT8R5qFv4t9COl1bmIp8VniloVHzGJtUtrRTIt64CMh50MiNcW_UsjKxyPsogIrd2S3HkjEVAJ2_fzTlrG50_NSPxnc50zOgcAf9b-LeOe-VDfr5vnqlc9NWEx59pxjuPfwT1cqsc8ivGeM9WfGg525edsdfkceOXrF5i6wm6_AMiEelqWu9rpHIrbF_7ykKOmaltSvasgFi4XkoC-Haqdyr-suPEg_4KU9MYqn110ghNcdkp7AuSS",
    "domain": "keystone.sites.qa.thirdstream.ca",
    "path": "/inbranch/deposits/en",
    "expires": -1,
    "httpOnly": true,
    "secure": true,
    "sameSite": "Lax"
  },
  {
    "name": "__Secure-FrontendUserSessionC2",
    "value": "tpMNCZDeOe6EVskiOdr3pMuv_Ktx7BHlWlvagQlP8viLcUCdA3lQGhedwLGI3LqDqXmwwnDZl-Sd5lhz7ZOVfYPru8glo7q1Xz0f4Yzhm6kXsvdWtnyQgk6lodVMLiDPlsXMI_Wavf86SWAPTQ9Z3gvt7EZDcjFwHzn1KzxsVf3U5-azZDLw_26kaK2x4ryHI-qqVLwp343DV-Nj9LkciKTk6tUoikXVy1T-vtsHrOJcAcGshS0SUrdQEvhuR3BujJnwrZGZZ7C3iG17Y0DBacqULm8zVU96kdIbe6CEQLLI44D-Z4dR-66YZZm8uLJB3QJU5DcW8t1AEXtsUcmY40ztoXd-655wmaSr5Oevj19GVc7hwC-9dFgIngH3gWOdRlwz98HXdIXEeSwviJBeyCG68EsJUF6EiVLtU93kFa6sSOdqoirzNEt0n-nyycA0JYz4No4EkDQE0sVMeiASazxAw_01_5lfpqGCxlRkqtmK12liuAIPyi2UzfmrzDf39AVwMaeGFItQTieFJkOzuRlHnTwWy7Om_UHp1R7uLBG4J7bLPkOIA7fhOS803h8eIT4qeT1Fsept4jhqP8P_eScXLuh4HqQI6D7Z9o2VNic5MC4pWSMKyeIB2L22JYhPLRjpGzFw6-ejCpNskI3CKb8JuJFAVYqzYzFgUWQgXBOdnDB8OFAZBX22vH2MMECfIc0j-e12ubwx7yTH-b6Nu8Ka80enIaHQ-1eUiwn26QsYddG5LlZ5rGxnPVhTPE5mtxTISasagr1zF1icmcXkmJNW_et2BsgjB74kpQYnvva9KOSAXzWN8l7oB940uGhOilZie2XOc-n7owsR_xbni0UyawHP_lisjQk3CKeX-BhuSc2XrBp2gAJDW57hDcm0g-cLojopdc8PzxG8wSjAWBNOFouarXH_7ZQOOF5HS5Tps5NtAihJyPudToze9bF1H_XkjaXuEdjvABkMklrYiIfZaeapXXaX-v7LPzQEeWeK7eBVadSrDLRw24EPWvNBbJp5LxXFl7LIbjUgxTdGiVot-HZ6iFFwzS4lVUetIiLvyq8JXpQw7njadrku2RQpt5ACGycEFuxfyna-yiSJHCa4Ik8ug-IhdyIbMISA9_7TMAI6fk1xcrwmwno4cQHmi7Mdlm2ewzk-gk8sBLHQhpysKrscVPso7w9suPPe1tJ-BomrYzpy8M5XO23DprLNn4BkOMP0GB_D_w9AHOEg7L725ojUSgUWqafZ0yRqMX5_NhXg8zvMEsv-QK9FalhltkYhV9bx2-jUSA7SWQpf7h-vH8tjoQQarQZsGOrj9_tqwuvy_vaRRM7BrFKcrw1z5mCqWA7CcWWmTpsjrhbP1miTyjME0Yc-vE7q7bow5NClu47frtF8E0MY9AIWBI1k29xSUx4sOSXHtUsJI2lD5JbQiuo7cZE9DdCGbKDnVPRe72kmGtXgahpe2AZ2fJ2HyDGgTvAFiDu2_WVa77KsEfTQutPAzXqH9flq9GcJ_xzmgmpdhStEn2hNrX6C-U8ik1IB3dAvg1DLumaU_m6xeE8qSFd9suQqXzBlgcI-BnRmWcniG72ZBd5sfTsHSp9XNYsP5DfUSbHtfft2YJ5TbsFN7EFIqAtDepLISqoQ_2mpHQ3s8fco7602e-u8_86PWE4Xs6j4_85hcCN-jyNDWi0rY_YKoiVLHXvbTrgNfgnckcoXlv60gwrXSkwoHgx0usKY5vkSHjHV4MSDbYo62FWHRdTZQSp4LRTkT1BsHtr_Nh6C2wTbdFEi2ViAdE3YUVQTqULANXdvHcm5fBYuCjoSytuMbqzKloEasDiOSjvhcaSvb58BWbXaSbPP7cXw2ZvWK7zpzTNwYBqD17TV3iLSezwTqUqcL8q8aYJ4Lzye2xNEgnYeFf2jk-",
    "domain": "keystone.sites.qa.thirdstream.ca",
    "path": "/inbranch/deposits/en",
    "expires": -1,
    "httpOnly": true,
    "secure": true,
    "sameSite": "Lax"
  },
  {
    "name": "idsrv.session",
    "value": "DEF89283CF964BD18C154EAB43C2580D",
    "domain": "identity.qa.thirdstream.ca",
    "path": "/sso/keystone",
    "expires": -1,
    "httpOnly": false,
    "secure": true,
    "sameSite": "None"
  },
  {
    "name": "idsrv",
    "value": "CfDJ8ARAjTyhMUxKmAfIB4-5oPPow2DhL06PfQcdZvfBzC1zITjsae4QMHYYQelW9t6VSdqwZ_TEKJpZyx6f53db1OY8qrOAVpe33sSuu-o5WW4mg7VSw6MztTF1_DPD9wpxjfZqJ6bAOs9DbsVQiVxoJe7NwzsaXghixNcAI8TFhyiFlVZafvLX7RXdUfkCrA2F7KehnXT4tGiI1okuhbc8HwcRdshF6iaSHuEoW_SzJ1-ymdm8kYH7XK4QJ7-ag_f3yFMCdDTSI5oINOEgEE5wOYFwA1oBHdm9l9_8b0QQZ0z2Dd53dcTUv01SEUZDCz47kXkXkX-WoO01x8G-PCsN8lgS_f6rNl7KsypeaRMsAOJSnrxKzAVZaZP-x7_zTFXizmSBoGpTma5mbowFobfVzjD_eYs5GaZBX8pGEu7WK5LmAnrZT3ngQILnr_cvg6uXl-7WVUOcq4bUShKtOuh2P2o_lgP8qrAqEUG99F3v8O7G9ULiRLoM4MDno7LowZXPF2F9HnELfX860FTm6HULK4mDbSxD_eEQen1gBGkeNNidYdFUVLrraTfZsv0OgfgtvyAFEjvP0_pC-U3dxSYSybl_ICzSXCOxbYkrtzzfk_rsqF9J3GmzJnhvQhdAj5oUQWkuc3966YDm3DKjAdpNPYP1tOdDfQO8O_qPMQ26x45tsyQr_ZvPbJs3jrnMKolOzoZ8e2H7Lcb20_Ie5qSry4NtQvZi4lVsaRjSDLQI2cKsv8SGC_p8GCB7c-InF_phjSl1F2RNqWM00hsj4P24cfW6dFI_PqeEZS2MkUE8S51GVYkRMliiPv5R2zy-D9e222_R1MiZT1bAAcNO4Fmf9sIPQsjJ0iSTaL1359hM2zgB3WVlkWMubKh_AvwVOtsoVg",
    "domain": "identity.qa.thirdstream.ca",
    "path": "/sso/keystone",
    "expires": -1,
    "httpOnly": true,
    "secure": true,
    "sameSite": "None"
  },
  {
    "name": "saml-session",
    "value": "4ecfa959-e471-438f-a40e-060e43250c37",
    "domain": "identity.qa.thirdstream.ca",
    "path": "/",
    "expires": -1,
    "httpOnly": true,
    "secure": true,
    "sameSite": "None"
  },
  {
    "name": "esctx-fIkc3xrVp0",
    "value": "AQABCQEAAABVrSpeuWamRam2jAF1XRQEE2nPd23-5oT1f6F4BYGpCNfwv_3y0TEdPZZtrsbjbISq1kNTt29exeE9TSFt3N7rVtbxMD6XZqPdMsyjFhRV1455zixYKsLF5WHnzTZk2pFwpX39HVvSYHhXl4vG7qUVbxaRoCS6enKWVis-pMp0cSAA",
    "domain": ".login.microsoftonline.com",
    "path": "/",
    "expires": -1,
    "httpOnly": true,
    "secure": true,
    "sameSite": "None"
  },
  {
    "name": "x-ms-gateway-slice",
    "value": "estsfd",
    "domain": "login.microsoftonline.com",
    "path": "/",
    "expires": -1,
    "httpOnly": true,
    "secure": true,
    "sameSite": "None"
  },
  {
    "name": "stsservicecookie",
    "value": "estsfd",
    "domain": "login.microsoftonline.com",
    "path": "/",
    "expires": -1,
    "httpOnly": true,
    "secure": true,
    "sameSite": "None"
  },
  {
    "name": "AADSSO",
    "value": "NA|NoExtension",
    "domain": ".login.microsoftonline.com",
    "path": "/",
    "expires": -1,
    "httpOnly": false,
    "secure": true,
    "sameSite": "None"
  },
  {
    "name": "SSOCOOKIEPULLED",
    "value": "1",
    "domain": "login.microsoftonline.com",
    "path": "/",
    "expires": 1758838106,
    "httpOnly": false,
    "secure": true,
    "sameSite": "None"
  },
  {
    "name": "esctx-fGTN21HaME",
    "value": "AQABCQEAAABVrSpeuWamRam2jAF1XRQESQmWcRYlUmeUkrTVU77-VhJwYU9dYZVaiNHdTzs5OxFsrfAvmDE5LTVRzt2an6jv56m6_0XQSn3KKv6NM3choq6Q8KoJgB22jDAAtlSY5nz074xRHqdiOHjcapdRXXTQlCVIq_IClQL3VK0ycBaD7SAA",
    "domain": ".login.microsoftonline.com",
    "path": "/",
    "expires": -1,
    "httpOnly": true,
    "secure": true,
    "sameSite": "None"
  },
  {
    "name": "MicrosoftApplicationsTelemetryDeviceId",
    "value": "8f2d1ff3-e698-4500-806b-e7078ed567c9",
    "domain": "login.microsoftonline.com",
    "path": "/",
    "expires": 1790374076.292214,
    "httpOnly": false,
    "secure": true,
    "sameSite": "None"
  },
  {
    "name": "brcap",
    "value": "0",
    "domain": ".login.microsoftonline.com",
    "path": "/",
    "expires": 1792534047,
    "httpOnly": false,
    "secure": true,
    "sameSite": "None"
  },
  {
    "name": "MC1",
    "value": "GUID=7503a6e0fbb84ca78c2601ffc12ca580&HASH=7503&LV=202509&V=4&LU=1758838059974",
    "domain": ".microsoft.com",
    "path": "/",
    "expires": 1790374060.251196,
    "httpOnly": false,
    "secure": true,
    "sameSite": "None"
  },
  {
    "name": "MS0",
    "value": "10e0275a838f4156b44cf66a6645cb8e",
    "domain": ".microsoft.com",
    "path": "/",
    "expires": 1758839860.251271,
    "httpOnly": false,
    "secure": true,
    "sameSite": "None"
  },
  {
    "name": "MSFPC",
    "value": "GUID=7503a6e0fbb84ca78c2601ffc12ca580&HASH=7503&LV=202509&V=4&LU=1758838059974",
    "domain": "login.microsoftonline.com",
    "path": "/",
    "expires": 1790374060.253544,
    "httpOnly": false,
    "secure": true,
    "sameSite": "None"
  },
  {
    "name": "wlidperf",
    "value": "FR=L&ST=1758838063931",
    "domain": ".microsoftonline.com",
    "path": "/",
    "expires": 1792534063,
    "httpOnly": false,
    "secure": true,
    "sameSite": "None"
  },
  {
    "name": "ESTSAUTHLIGHT",
    "value": "+008d2cb9-7fe9-dcc8-4d08-8428f7fd6f93",
    "domain": "login.microsoftonline.com",
    "path": "/",
    "expires": -1,
    "httpOnly": false,
    "secure": true,
    "sameSite": "None"
  },
  {
    "name": "esctx-mB3RpB6mZc",
    "value": "AQABCQEAAABVrSpeuWamRam2jAF1XRQEXnswLy_iMaF_LstLRH0w6lO8HiRi_YvCICxeEiZiauGV2Vsj-OkzEcuec1hK9aHxdIqcwpyDzg6RfANu_yinNt0bO0JFv8ucVWeQgwrigePUihiNg6DRzChbdbfqHx76Z0NlXSeWFf9i_deWPiooliAA",
    "domain": ".login.microsoftonline.com",
    "path": "/",
    "expires": -1,
    "httpOnly": true,
    "secure": true,
    "sameSite": "None"
  },
  {
    "name": "esctx",
    "value": "PAQABBwEAAABVrSpeuWamRam2jAF1XRQEsRZOsWhxpTzh52Jm4Rlngrrb97AclrNMT3LP9VVFsLbxgarqS_Q89wusVyU6NWn2GH40U7w74LRhYsK0DU_90uTmXiEhSqq_6xxr9zwa6Lijsu9YOLMdDo7OUPgqQ7Tzzz0WYLA36_JrR60P-vHQ2_D0DGks1X5VNeuyPrd2fhAgAA",
    "domain": ".login.microsoftonline.com",
    "path": "/",
    "expires": -1,
    "httpOnly": true,
    "secure": true,
    "sameSite": "None"
  },
  {
    "name": "esctx-2abuYCyWYAY",
    "value": "AQABCQEAAABVrSpeuWamRam2jAF1XRQELcBlhXbypKOiVmoZBrRVnpMWYNFx-G8foV6BhLEUBCHOrQltS83Db5TnSw5CtYX7esDJq8GQ-W2uMyHrWVKVZgZqn90wnlYd2E1PTflPGZgH2C3vCx5nrITQSAg-OPPyUVUmTVJE8wp9d7rYDGDeBCAA",
    "domain": ".login.microsoftonline.com",
    "path": "/",
    "expires": -1,
    "httpOnly": true,
    "secure": true,
    "sameSite": "None"
  },
  {
    "name": "uaid",
    "value": "8fe137c2dc694b618541092ab9c0281c",
    "domain": ".login.live.com",
    "path": "/",
    "expires": -1,
    "httpOnly": true,
    "secure": true,
    "sameSite": "None"
  },
  {
    "name": "MSPRequ",
    "value": "id=N&lt=1758838076&co=0",
    "domain": ".login.live.com",
    "path": "/",
    "expires": -1,
    "httpOnly": true,
    "secure": true,
    "sameSite": "None"
  },
  {
    "name": "ESTSAUTHPERSISTENT",
    "value": "1.ARsAEpugaxjjv0mSMqitqKe--L8rG4qVNehBuWqNiPZQ-7vYAJwbAA.AgABFwQAAABVrSpeuWamRam2jAF1XRQEAwDs_wUA9P_WbVwTkNP_GUPQhn0NUsFRdDnf6HKAIlVNHujHmkCXG42AthHMykDDvWzWp8UuPi_XR3w8CnYtYBqOsy0v_d6jpk1vRj1wVY1t-VoyBuAAOyDBkHdupp6OrOgEddmXgVZhWoTRVTXGDaygTuUOBkOSICjGwhT34jXUcofaeL-7PKpVXvm5gbcJ9CN4WMTs1VO2D1m0Yr_nEULL3riJ04cCYmjIh7EebQFqQEXyMF3k0MIbnfagd52IEbK9tfbKonKVZwDm9ulRLs8slyWaNL9_m1deRBJgoKMxf9gq0UGM3MToEazXounWzGUL43C0LYcS4agPSp7ZilheN9RBGOGA5JCiWAzdlutMyI1O28mC-BlFvOFrH7bbD4I95s2RPdpfsyZtLJksSVoWhtjeYd7U5l8Du9xOMpB4p8Sv2tjFxHzBhfVPe_5BKSVuA4K8idFcXposNoW5TuTMzcq7K7Ljb-3cFojX5GS8IlLB9kHmVgRw53jQqqPoQ82xWOlikhtOKiD9sAbDXQSWj7a6TiZsYxERqNlhOM9X9Spt41hsYzRlR5f6Y1VeTbO8OFyzxAC9OxfF4YJ62FdqLSg0-NEYRL0Ksq1y1Af3XD9VlULaCib9nWOInJhNS-ChEDtqyHajqUi5ymDXbg",
    "domain": ".login.microsoftonline.com",
    "path": "/",
    "expires": 1766614078.960542,
    "httpOnly": true,
    "secure": true,
    "sameSite": "None"
  },
  {
    "name": "ESTSAUTH",
    "value": "1.ARsAEpugaxjjv0mSMqitqKe--L8rG4qVNehBuWqNiPZQ-7vYAJwbAA.AgABFwQAAABVrSpeuWamRam2jAF1XRQEAwDs_wUA9P9vu4tkAV1vnGmWHtDGqH_KKrgaoswtGwB4VdHylFSfRGqyzizJsK7Zwpey0DXVFj6HsyZ_E4QoNjE6",
    "domain": ".login.microsoftonline.com",
    "path": "/",
    "expires": -1,
    "httpOnly": true,
    "secure": true,
    "sameSite": "None"
  },
  {
    "name": "buid",
    "value": "1.ARsAEpugaxjjv0mSMqitqKe--L8rG4qVNehBuWqNiPZQ-7vYAJwbAA.AQABGgEAAABVrSpeuWamRam2jAF1XRQECSEHHiMeikpblitY-0Fm9wNtkg45KrdYXD7EhLOpMWR6PWRDQ1GOZh-1Mv5FJ3H31bbbFudzQW3nV7iwMOjQMSpVAtA1teK6zzNemahLm5ilZCh5GQCRtgXvahKr6zU5HMPNfe320dEn8IL8jzjkhgBC8qKUZhEbaUUWEEaI6IkgAA",
    "domain": "login.microsoftonline.com",
    "path": "/",
    "expires": 1761430078.960668,
    "httpOnly": true,
    "secure": true,
    "sameSite": "None"
  },
  {
    "name": "CCState",
    "value": "RWhJS0VIMG1ld3RHSGM5TWgwdStKemR6S3FBPQ==",
    "domain": ".login.microsoftonline.com",
    "path": "/",
    "expires": 1759702078.960733,
    "httpOnly": true,
    "secure": true,
    "sameSite": "None"
  },
  {
    "name": "SignInStateCookie",
    "value": "CAgABFgIAAABVrSpeuWamRam2jAF1XRQEAwDs_wUA9P9kM2yWfwPjFZ-wFitTK5rVrLzXa0xB0VqrA5ym29Ake9MjJ7kK0NFBQLpxRMS_Y_qGtudBWuKRZ29QrCS9llzJwEgt-cmyqmB5mkwZ1cQWi-8Pna2gkXfYu1Lf1h8N_KSym2585tAAArwwd7530EckvnVdR02IGdTQ4MtcQsc0XYrSh0Oy7OpP_b87hnvP7ZNZVSksX8c6RB5AndYbM7F3grrMV3u68WZVKNdESc7gjC4I0esGFhgE3ATnuLuSl48ieVAA6rjQ7Qs3XgqhycE69O0yujM1k_roPW9jXDCP",
    "domain": ".login.microsoftonline.com",
    "path": "/",
    "expires": -1,
    "httpOnly": true,
    "secure": true,
    "sameSite": "None"
  },
  {
    "name": "fpc",
    "value": "AgwWNvj7g4RPuce3z51dKDyh_UgrAQAAAB20Z-AOAAAA9i6B0gEAAAAvtGfgDgAAAAJvwToCAAAAOrRn4A4AAAA",
    "domain": "login.microsoftonline.com",
    "path": "/",
    "expires": 1761430078.960821,
    "httpOnly": true,
    "secure": true,
    "sameSite": "None"
  },
  {
    "name": "ai_session",
    "value": "ULfbDQX/84ravqQ6p+O2Dj|1758838057921|1758838078966",
    "domain": "login.microsoftonline.com",
    "path": "/",
    "expires": 1758839878,
    "httpOnly": false,
    "secure": true,
    "sameSite": "None"
  },
  {
    "name": "ai_user",
    "value": "RjPurLkhbfXrrUDh8u8Hp4|2025-09-25T22:08:00.598Z",
    "domain": "keystone.sites.qa.thirdstream.ca",
    "path": "/",
    "expires": 1790374080.598695,
    "httpOnly": false,
    "secure": true,
    "sameSite": "None"
  },
  {
    "name": "ai_session",
    "value": "tLJZ9G4/9w+/ALgtSs56CA|1758838080683|1758838080683",
    "domain": "keystone.sites.qa.thirdstream.ca",
    "path": "/",
    "expires": 1758839880.684215,
    "httpOnly": false,
    "secure": true,
    "sameSite": "None"
  }
];


const PlaywrightGoogle = 'https://script.google.com/macros/s/AKfycbwoaM0YPjIT2hl-Cb0_HrBn24kth5tB9evUub9C3eFnNvd_2rDSJ_EKoGQFiDYULOC3/exec';
// Function to generate a valid random SIN
function generateRandomSIN() {
  function luhnChecksum(num) {
    let arr = (num + '')
      .split('')
      .reverse()
      .map(x => parseInt(x));
    let lastDigit = arr.shift();
    let sum = arr.reduce(
      (acc, val, idx) =>
        idx % 2 !== 0
          ? acc + val
          : acc + ((val *= 2) > 9 ? val - 9 : val),
      0
    );
    sum += lastDigit;
    return sum % 10 === 0;
  }

  function generateBaseSIN() {
    let sin;
    do {
      sin = Math.floor(100000000 + Math.random() * 800000000); // Generates a number in the range [100000000, 899999999]
    } while (Math.floor(sin / 100000000) === 9); // Ensure the first digit is not 9
    return sin;
  }

  let sin;
  do {
    sin = generateBaseSIN();
  } while (!luhnChecksum(sin));
  return sin.toString();
}

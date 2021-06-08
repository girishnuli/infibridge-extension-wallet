export default [
    {
        inputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'implementation',
                type: 'address',
            },
        ],
        name: 'ImplementationSet',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
        ],
        name: 'OwnerSet',
        type: 'event',
    },
    { payable: true, stateMutability: 'payable', type: 'fallback' },
    {
        constant: false,
        inputs: [
            { internalType: 'address', name: 'newOwner', type: 'address' },
        ],
        name: '_transferOwnership',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {
                internalType: 'address',
                name: 'implementation',
                type: 'address',
            },
            { internalType: 'bytes', name: 'callbackData', type: 'bytes' },
        ],
        name: '_setAndInitializeImplementation',
        outputs: [],
        payable: true,
        stateMutability: 'payable',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: '_getImplementation',
        outputs: [
            {
                internalType: 'address',
                name: 'implementation',
                type: 'address',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {
                internalType: 'address',
                name: 'implementation',
                type: 'address',
            },
        ],
        name: '_setImplementation',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: '_getOwner',
        outputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
]

const connectionConfig = (cert: string) => (<const>{
    "name": "network-metapprendo",
    "version": "1.0.0",
    "client": {
        "organization": "MetApprendo",
        "connection": {
            "timeout": {
                "peer": {
                    "endorser": "300"
                }
            }
        }
    },
    "organizations": {
        "MetApprendo": {
            "mspid": "MetApprendo",
            "peers": [
                "peer0-metapprendo",
                "peer1-metapprendo"
            ],
            "certificateAuthorities": [
                "metapprendo-ca"
            ]
        }
    },
    "peers": {
        "peer0-metapprendo": {
            "url": "grpcs://peer0:7051",
            "tlsCACerts": {
                "pem": cert
            }
        },
        "peer1-metapprendo": {
            "url": "grpcs://peer1:7051",
            "tlsCACerts": {
                "pem": cert
            }
        }
    },
    "certificateAuthorities": {
        "metapprendo-ca": {
            "url": "https://metapprendo-ca:7054",
            "caName": "metapprendo-ca",
            "tlsCACerts": {
                "pem": [cert]
            },
            "httpOptions": {
                "verify": false
            }
        }
    }
})

export { connectionConfig }
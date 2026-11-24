import fs from "node:fs"

function parseAdbDevices(fixture) {
    const devices = []
    
    const lines = fixture.split("\n")
    
    for (const line of lines) {
        if (line.startsWith("List of devices attached")) { continue }
        
        if (line.trim()) {
            const tokens = line.trim().split(/\s+/)
            
            const data = {
                "serial": tokens[0],
                "state": tokens[1],
                "model": null
            }
            
            tokens.slice(2).forEach(x => {
                const index = x.indexOf(":")
                
                if (index === -1) return
                
                const key = x.slice(0, index)
                const value = x.slice(index + 1)
                
                if (key !== "model") {
                    data[key] = value
                } else {
                    data.model = value.replaceAll("_", " ")
                }
            })
            
            devices.push(data)
        }
    }
    
    return devices
}

export { parseAdbDevices }
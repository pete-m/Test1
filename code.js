/* engine.js - The Navigator Core */
class Navigator {
    constructor(instanceName) {
        const parms = window.NavigatorRegistry[instanceName];
        if (!parms) {
            alert("Error: Manifest '" + instanceName + "' not found.");
            return;
        }

        this.container = document.getElementById('navigator-stage');
        this.init(parms.data, parms.options);
    }

    init(data, userOptions) {
        const options = {
            nodes: {
                shape: 'dot',
                font: { face: 'Courier New', size: 14, align: 'center' },
                borderWidth: 2,
                shadow: true
            },
            edges: {
                smooth: { type: 'continuous' },
                font: { size: 10, color: '#666', align: 'top' },
                arrows: 'to'
            },
            interaction: { hover: true },
            physics: { 
                enabled: true, 
                solver: 'forceAtlas2Based',
                forceAtlas2Based: { gravitationalConstant: -100, centralGravity: 0.01 } 
            },
            ...userOptions
        };

        const network = new vis.Network(this.container, data, options);

        // Click to Open Forensic Links
        network.on("selectNode", (params) => {
            const nodeId = params.nodes[0];
            const node = data.nodes.get(nodeId);
            if (node.url) window.open(node.url, '_blank');
        });
    }
}
window.NavigatorRegistry = {};
 
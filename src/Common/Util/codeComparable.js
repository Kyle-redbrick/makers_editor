const acorn = require("acorn");
const walk = require("acorn-walk");

export function isCodeExist(code, targetCode) {
  let ast, targetAST;
  try {
    ast = acorn.parse(code);
    targetAST = acorn.parse(targetCode);
  } catch(err) {
    console.warn(err);
    return false;
  }
  return isASTExist(ast, targetAST);
}

export function isASTExist(ast, targetAST) {
  let nodes, targetNodes;
  try {
    nodes = getNodesFrom(ast);
    targetNodes = getNodesFrom(targetAST);
  } catch(err) {
    console.warn(err);
    return false;
  }

  for (let i = 0; i < targetNodes.length - nodes.length + 1; i++) {
    let isEqual = true;
    for (let j = 0; j < nodes.length; j++) {
      const node = nodes[j];
      const targetNode = targetNodes[i + j];
      if(!compareASTNode(node, targetNode)) {
        isEqual = false;
        break;
      }
    }
    if(isEqual) {
      return true;
    }
  }
  
  return false;
}

function getNodesFrom(ast) {
  const nodes = [];

  walk.ancestor(ast, {
    Literal(node, ancestors) {
      nodes.push({
        type: "Literal",
        value: node.value,
        ancestors: ancestors.map(n => n.type)
      });
    },
    Identifier(node, ancestors) {
      nodes.push({
        type: "Identifier",
        name: node.name,
        ancestors: ancestors.map(n => n.type)
      });
    }
  });

  return nodes;
}

function compareASTNode(node, targetNode) {
  for(let key in node) {
    switch(key) {
      case "ancestors":
        if(JSON.stringify(node[key]) !== JSON.stringify(targetNode[key])) {
          return false;
        } else {
          break;
        }
      default:
        if(node[key] !== targetNode[key]) {
          return false;
        } else {
          break;
        }
    }
  }
  return true;
}

// SPDX-License-Identifier: MIT
export function assertRuntimeGitlink(line,expected){
  if(!/^[a-f0-9]{40}$/.test(expected)||line!==`160000 ${expected} 0\tdlls/xgameruntime`)throw Error('Wrong C++ runtime gitlink');
}

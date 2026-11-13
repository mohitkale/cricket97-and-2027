import { BufferGeometryLoader } from 'three';

// Each actor retains its own skeleton and team colours. Only geometry is shared.
export async function loadStockPlayers(players) {
  const geometry=await new BufferGeometryLoader().loadAsync(import.meta.env.BASE_URL+'legacy/models/striker-body.json');
  const actors=players.map(player=>{
    const {skinMesh,kit,skin}=player.userData;
    return {player,mesh:skinMesh,stockMaterials:[kit,skin],fallback:skinMesh.geometry,
      fallbackMaterial:skinMesh.material,near:false};
  });
  return function updateDetail(camera){
    for(const [index,actor] of actors.entries()){
      const distance=camera.position.distanceToSquared(actor.player.position);
      const near=index===0 || distance<(actor.near?24:20)**2;
      if(near===actor.near)continue;
      actor.mesh.geometry=near?geometry:actor.fallback;
      actor.mesh.material=near?actor.stockMaterials:actor.fallbackMaterial;
      actor.near=near;
    }
  };
}

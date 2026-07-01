/**
 * Verifye si yon "target" (jwè a) nan vizyon yon NPC
 * @param {object} npc - dwe gen: x, y, angle (an radian, direksyon l ap gade)
 * @param {object} target - dwe gen: x, y (pozisyon jwè a)
 * @param {number} viewDistance - distans maksimòm NPC ka wè (an pixel)
 * @param {number} viewAngle - lajè ang vizyon an (an radian, egz: Math.PI/3 = 60°)
 * @returns {boolean} true si NPC ka wè target la
 */
function canSeeTarget(npc, target, viewDistance = 200, viewAngle = Math.PI / 3) {
  const dx = target.x - npc.x;
  const dy = target.y - npc.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // 1. Tcheke si li twò lwen
  if (distance > viewDistance) return false;

  // 2. Kalkile ang ant NPC ak target
  const angleToTarget = Math.atan2(dy, dx);

  // 3. Kalkile diferans ant direksyon NPC ap gade a ak ang target la
  let angleDiff = angleToTarget - npc.angle;

  // Normalize diferans lan ant -PI ak PI// Nan update loop ou a, pou chak polis/NPC
police.forEach(cop => {
  if (canSeeTarget(cop, player, 250, Math.PI / 3)) {
    // Jwè a nan vizyon polis la!
    cop.state = "chasing";
    cop.lastKnownPlayerPos = { x: player.x, y: player.y };
  }
});
  while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
  while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

  // 4. Si diferans lan pi piti pase mwatye vision cone a, li wè lfunction drawVisionCone(ctx, npc, viewDistance = 200, viewAngle = Math.PI / 3, color = "rgba(255,0,0,0.2)") {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(npc.x, npc.y);
  ctx.arc(
    npc.x, npc.y,
    viewDistance,
    npc.angle - viewAngle / 2,
    npc.angle + viewAngle / 2
  );
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}
  return Math.abs(angleDiff) <= viewAngle / 2;
}

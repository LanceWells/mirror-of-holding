// struct VertextOutput {
//   @builtin(position) clip_position: vec4<f32>,
// };

// @vertex
// fn vs_main(
//   @builtin(vertex_index) in_vertex_index: u32,
// ) -> VertextOutput {
//   var out: VertextOutput;
//   let x = f32(1 - i32(in_vertex_index)) * 0.5;
//   let y = f32(i32(in_vertex_index & 1u) * 2 - 1) * 0.5;
//   out.clip_position = vec4<f32>(x, y, 0.0, 1.0);
//   return out;
// }

// @fragment
// fn fs_main(in: VertextOutput) -> @location(0) vec4<f32> {
//   return vec4<f32>(0.3, 0.2, 0.1, 1.0);
// }

@vertex fn vertexMain(@builtin(vertex_index) i: u32) ->
  @builtin(position) vec4f {
  const pos = array(vec2f(0, 1), vec2f(-1, -1), vec2f(1, -1));
  return vec4f(pos[i], 0, 1);
}

@fragment fn fragmentMain() ->
  @location(0) vec4f {
  return vec4f(1, 0, 0, 1);
}

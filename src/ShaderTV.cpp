#include "raylib.h"

int main() {
    int sx = 1200, sy = 675;
    InitWindow(sx, sy, "ShaderTV");
    SetTargetFPS(60);

    Shader shader = LoadShader(0, "shader.frag");

    int ShaderRes = GetShaderLocation(shader, "u_resolution");
    int ShaderTime = GetShaderLocation(shader, "u_time");

    Vector2 resolution = {(float)sx, (float)sy};

    while (!WindowShouldClose()) {
        float time = GetTime();

        SetShaderValue(shader, ShaderRes, &resolution, SHADER_UNIFORM_VEC2);
        SetShaderValue(shader, ShaderTime, &time, SHADER_UNIFORM_FLOAT);

        BeginDrawing();
        ClearBackground(RAYWHITE);

        BeginShaderMode(shader);
            DrawRectangle(0, 0, sx, sy, WHITE);
        EndShaderMode();

        EndDrawing();
    }

    UnloadShader(shader);
    CloseWindow();
    return 0;
}

@echo off
echo ========================================
echo   APRESENTACOES MARCILLIANO - ABERTURA
echo ========================================
echo.
echo Escolha uma opcao:
echo.
echo 1. Apresentacao Stakeholder (Recomendada)
echo 2. Apresentacao Cliente
echo 3. Abrir ambas
echo 4. Ver instrucoes
echo.
set /p choice="Digite sua opcao (1-4): "

if "%choice%"=="1" (
    echo.
    echo Abrindo Apresentacao Stakeholder...
    start "" "local_presentation\stakeholder\index.html"
    echo.
    echo Apresentacao aberta! Use o menu lateral para navegar.
    echo.
) else if "%choice%"=="2" (
    echo.
    echo Abrindo Apresentacao Cliente...
    start "" "local_presentation\client\index.html"
    echo.
    echo Apresentacao aberta! Use o menu superior para navegar.
    echo.
) else if "%choice%"=="3" (
    echo.
    echo Abrindo ambas as apresentacoes...
    start "" "local_presentation\stakeholder\index.html"
    start "" "local_presentation\client\index.html"
    echo.
    echo Ambas as apresentacoes abertas!
    echo.
) else if "%choice%"=="4" (
    echo.
    echo Abrindo instrucoes...
    start "" "GUIA_ENTREGA_COMPLETO.md"
    echo.
    echo Instrucoes abertas!
    echo.
) else (
    echo.
    echo Opcao invalida! Tente novamente.
    echo.
)

echo Pressione qualquer tecla para sair...
pause >nul

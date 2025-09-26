#!/bin/bash

echo "========================================"
echo "   APRESENTAÇÕES MARCILLIANO - ABERTURA"
echo "========================================"
echo ""
echo "Escolha uma opção:"
echo ""
echo "1. Apresentação Stakeholder (Recomendada)"
echo "2. Apresentação Cliente"
echo "3. Abrir ambas"
echo "4. Ver instruções"
echo ""
read -p "Digite sua opção (1-4): " choice

case $choice in
    1)
        echo ""
        echo "Abrindo Apresentação Stakeholder..."
        open "local_presentation/stakeholder/index.html" 2>/dev/null || xdg-open "local_presentation/stakeholder/index.html" 2>/dev/null || start "local_presentation/stakeholder/index.html"
        echo ""
        echo "Apresentação aberta! Use o menu lateral para navegar."
        echo ""
        ;;
    2)
        echo ""
        echo "Abrindo Apresentação Cliente..."
        open "local_presentation/client/index.html" 2>/dev/null || xdg-open "local_presentation/client/index.html" 2>/dev/null || start "local_presentation/client/index.html"
        echo ""
        echo "Apresentação aberta! Use o menu superior para navegar."
        echo ""
        ;;
    3)
        echo ""
        echo "Abrindo ambas as apresentações..."
        open "local_presentation/stakeholder/index.html" 2>/dev/null || xdg-open "local_presentation/stakeholder/index.html" 2>/dev/null || start "local_presentation/stakeholder/index.html"
        open "local_presentation/client/index.html" 2>/dev/null || xdg-open "local_presentation/client/index.html" 2>/dev/null || start "local_presentation/client/index.html"
        echo ""
        echo "Ambas as apresentações abertas!"
        echo ""
        ;;
    4)
        echo ""
        echo "Abrindo instruções..."
        open "GUIA_ENTREGA_COMPLETO.md" 2>/dev/null || xdg-open "GUIA_ENTREGA_COMPLETO.md" 2>/dev/null || start "GUIA_ENTREGA_COMPLETO.md"
        echo ""
        echo "Instruções abertas!"
        echo ""
        ;;
    *)
        echo ""
        echo "Opção inválida! Tente novamente."
        echo ""
        ;;
esac

echo "Pressione Enter para sair..."
read

# Design System — NTN MACHINE

## Identidade visual

**Marca:** NTN MACHINE  
**Posicionamento:** desenvolvimento de software, IA, automações, dados e tecnologia para negócios.  
**Estilo:** premium, dark, tecnológico, minimalista, com sensação de produto SaaS de alto nível.

---

## Paleta de cores

```css
:root {
  --ntn-black: #050507;
  --ntn-black-2: #0B0B10;
  --ntn-dark: #111118;
  --ntn-card: rgba(255, 255, 255, 0.06);
  --ntn-card-border: rgba(255, 255, 255, 0.12);

  --ntn-white: #FFFFFF;
  --ntn-text: #F5F5F7;
  --ntn-muted: #B7B7C8;
  --ntn-soft: #E8E6F4;

  --ntn-lavender: #C9C2F0;
  --ntn-lavender-2: #AFA6DC;
  --ntn-silver: #D8D8E2;
  --ntn-gray: #767685;

  --ntn-gradient-main: linear-gradient(135deg, #FFFFFF 0%, #C9C2F0 45%, #767685 100%);
  --ntn-gradient-button: linear-gradient(135deg, #FFFFFF 0%, #DCD7F5 100%);
  --ntn-gradient-dark: radial-gradient(circle at top right, rgba(201, 194, 240, 0.20), transparent 38%),
                       linear-gradient(180deg, #050507 0%, #0B0B10 100%);
}
```

---

## Tipografia

Sugestão de fonte:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

Uso:

```css
body {
  font-family: 'Inter', sans-serif;
}
```

Hierarquia:

- **Hero Title:** 64px / 72px / 800
- **Section Title:** 40px / 48px / 750
- **Card Title:** 18px / 24px / 700
- **Body:** 16px / 28px / 400
- **Small:** 13px / 20px / 500

---

## Componentes principais

### Header

- Fundo preto translúcido
- Logo à esquerda
- Menu central
- CTA à direita
- Blur leve no fundo

### Hero

- Fundo dark com grid, partículas e onda animada
- Logo/símbolo grande em 3D ou glass
- Título forte com palavras em gradiente
- Botões arredondados
- Cards de serviços abaixo do hero

### Cards

- Fundo glassmorphism
- Borda fina translúcida
- Hover com elevação e glow lavanda

### Botões

- Primário: fundo claro com texto escuro
- Secundário: fundo transparente com borda clara
- Hover: leve deslocamento para cima

---

## Direção visual

Evitar visual genérico de Canva.  
Priorizar aparência de startup SaaS premium, consultoria tech e produto enterprise.

Referências visuais:
- Apple: espaçamento, minimalismo, sofisticação.
- SAP: estrutura, clareza e visão corporativa.
- SaaS moderno: cards, dados, dashboards e motion.

# Always On Generators — Residential Load Calculator

A professional **NEC 2020 Article 220.82 Optional Method** load calculator for residential service entrance design and generator sizing.

## Features

✨ **NEC 2020 Compliance**
- Article 220.82 Optional Method for single-family dwellings
- Step-by-step load calculation (Steps 1–5)
- Demand factor: First 10,000 VA @ 100%, remainder @ 40%
- HVAC added @ 100% after demand factor
- NEC 220.61 neutral demand (first 200A @ 100%, above 200A @ 70%)
- NEC 310.16 conductor sizing (75°C column, Cu/Al)
- NEC 250.122 equipment grounding conductor (EGC) sizing
- NEC 680 pool panel feeder calculation

⚙️ **Complete Load Categories**
- **Step 1**: General lighting (3 VA/sq ft) + small appliance circuits (1,500 VA ea.) + laundry circuits (1,500 VA ea.)
- **Step 2**: A/C condensers (CU/HP ratings) & fixed electric space heating (65% demand for ≤4 units, 40% for >4)
- **Step 3**: Fixed appliances (water heater, dishwasher, disposal, refrigerator, etc.) with gas exclusion
- **Step 4**: Electric dryers (5,000 VA minimum or nameplate, gas excluded)
- **Step 5**: Electric cooking equipment (cooktops, ovens/ranges, 5,000–12,500 W)
- **Bonus**: Pool equipment panel with dedicated feeder sizing (NEC 430.24 continuous motor factor)

🔧 **Smart Calculations**
- Dynamic HVAC unit builder (up to 10 AHU/heating zones)
- Selectable conductor material (Copper or Aluminum, 75°C column)
- Parallel feeder support (auto-detects NEC 310.10(H) violations for <1/0 AWG)
- Motor HP to VA conversion (single-phase, 120V/240V NEC 430.248)
- Gas appliance VA reduction (ignition/control loads only)
- Pool phase current balancing (120V on Phase A, 240V split)
- Largest continuous motor @ 125% for pool feeder sizing (NEC 430.24)
- Generator selector with propane/natural gas output tables

📊 **Comprehensive Results**
- Summary panel with min. generator, service demand, feeder wire, neutral, EGC
- Load breakdown table (Steps 1–5 with demand factor math)
- All appliance rows with individual VA totals
- Pool sub-panel Phase A/B amperage and feeder wire
- Calculation detail showing exact NEC 220.82 formula steps
- Print-friendly report generation (full page & summary mode)

🎨 **User Experience**
- Tabbed interface (Summary, Steps 1–5, Pool, Help)
- Job info capture (company, address, city, phone)
- Real-time calculation as you type
- Gas checkbox toggles for appliances/HVAC (instant VA adjustment)
- Motor/HP dropdowns with auto-conversion
- Editable appliance names and quantities
- Dynamic row addition/removal (dryers, cooktops, ovens, pool pumps, etc.)
- Professional dark header with AOG branding
- Responsive mobile-friendly layout
- Print-optimized report with logo, tables, and NEC citations

## Getting Started

### No Installation Required
1. Save `index.html` to your device
2. Open in any modern web browser (Chrome, Firefox, Safari, Edge)
3. Works completely offline — all calculations run locally
4. No accounts, no cloud uploads, no tracking

### Basic Workflow
1. **Job Info** (top banner): Enter company, address, city, phone
2. **Step 1** tab: Enter floor area (sq ft), confirm small appliance & laundry circuit counts
3. **Step 2** tab: Select A/C tonnage and heating element wattage for each AHU
4. **Step 3** tab: Add/configure fixed appliances (qty, VA, voltage, gas flag)
5. **Step 4** tab: Add electric dryers (qty, VA, gas option)
6. **Step 5** tab: Add cooktops & ovens/ranges (wattage, gas option)
7. **Pool** tab (optional): Configure pool pump(s), heater(s), lights, blower; view feeder sizing
8. **Summary** tab: Review total demand, service size, feeder wire, neutral, EGC, min. generator
9. **Report** button: Generate professional print-to-PDF report

## Usage Examples

### Residential Home — 3,000 sq ft, 3-ton A/C, Electric Dryer, Gas Range
```
Step 1:
  ✓ 3,000 sq ft @ 3 VA/sq ft = 9,000 VA
  ✓ 2 small appliance circuits @ 1,500 VA = 3,000 VA
  ✓ 1 laundry circuit @ 1,500 VA = 1,500 VA
  Step 1 Total = 13,500 VA

Step 2:
  ✓ 3-ton A/C (CU) @ 3,600 VA + blower @ 800 VA = 4,400 VA
  ✓ No heating
  Step 2 = 4,400 VA (added @ 100% after demand factor)

Step 3 (example):
  ✓ Water heater (240V, 4,500 VA)
  ✓ Refrigerator (120V, 1,500 VA)
  ✓ Dishwasher (120V, 1,030 VA)
  ✓ Microwave (120V, 1,400 VA)
  Step 3 Total = 8,430 VA

Step 4:
  ✓ Electric dryer (240V, 5,000 VA)
  Step 4 = 5,000 VA

Step 5:
  ✓ Gas range (500 VA control only)
  ✓ Cooktop (electric, 7,000 VA)
  Step 5 = 7,500 VA

Optional Method Demand:
  Base loads = 13,500 + 8,430 + 5,000 + 7,500 = 34,430 VA
  First 10,000 @ 100% = 10,000 VA
  Remaining 24,430 @ 40% = 9,772 VA
  Base demand = 19,772 VA
  + HVAC @ 100% = 4,400 VA
  ─────────────────────────────
  Service Demand = 24,172 VA ÷ 240V = 100.7 A

Result:
  ✓ Minimum Service: 125 A
  ✓ Feeder: 2 AWG Copper (per NEC Table 310.16, 115 A @ 75°C)
  ✓ Neutral: 4 AWG Copper (NEC 220.61)
  ✓ EGC: 8 AWG Copper (NEC Table 250.122)
  ✓ Generator: 24.2 kW (select 26 kW LQ propane, 24 kW NG)
```

### Pool-Equipped Home
```
Pool Tab:
  ✓ 2 HP pool pump @ 240V (continuous)
    → 15 A × 1.25 = 18.75 A
  ✓ 3.5-ton pool heater @ 240V (electric)
    → 26 A
  ✓ 2 pool lights @ 120V (Phase A only)
    → 5 A
  ✓ Blower motor 1.5 HP @ 240V

Phase A: (pump/2 + heater/2 + lights) ÷ 120 = X A
Phase B: (pump/2 + heater/2) ÷ 120 = Y A

Results:
  ✓ Min. pool feeder: size copper @ 75°C for larger leg
  ✓ Min. panel breaker: next standard size
  ✓ Pool EGC: per NEC 250.122

Pool sub-panel VA is also included in Step 3 for main service demand.
```

## Technical Details

### Architecture
- **Single-file HTML/CSS/JavaScript** — no build tools, no dependencies
- **Offline-capable** — all calculations run client-side
- **Responsive design** — works on desktop, tablet, mobile
- **Print-optimized** — generates professional PDF reports

### Browser Support
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Key Functions
- `calc()` — Main calculation engine (Steps 1–5, pool, conductors, generator)
- `wireSize()` — NEC Table 310.16 lookup
- `egcWire()` — NEC Table 250.122 (EGC) lookup
- `hpVA()` — NEC 430.248 (single-phase motor FLA to VA conversion)
- `addAHU()`, `addDryer()`, `addCookItem()` — Dynamic row builders
- `printReport()` — Generate professional PDF-ready HTML report

### Data Tables
All values sourced directly from **NEC 2020 Chapter 3**:
- **NEC Table 310.16** (75°C column): Cu/Al conductor ampacity
- **NEC Table 310.12** (service entrance): Standard service sizes
- **NEC Table 250.122** (EGC): Equipment grounding conductor sizing
- **NEC Table 430.248** (motor FLA): Single-phase AC motor data
- **NEC 220.82** (demand calculation): Optional method formula
- **Generator specs**: Propane (LP) and natural gas (NG) output ratings

## NEC Rules & Formulas

### Optional Method (Art. 220.82)
```
Service Demand = [Base Loads × Demand Factor] + HVAC @ 100%

Where:
  Base Loads = Step 1 + Step 3 (raw VA) + Step 4 + Step 5 (raw VA)
  Demand Factor = First 10,000 VA @ 100%, remainder @ 40%
  HVAC (Step 2) = added at 100% AFTER demand factor (not in base pool)
  Step 1 = (floor area × 3 VA/sq ft) + (small appl circuits × 1,500) + (laundry × 1,500)
  Step 3 = sum of fixed appliance VA (no separate demand factor)
  Step 4 = dryer VA (5,000 VA minimum per unit)
  Step 5 = cooking equipment VA (raw, no demand factor)
```

### Neutral Demand (Art. 220.61)
```
Neutral Amps = First 200A @ 100% + Remainder @ 70%

Note: Applies to maximum unbalanced load between the two hot legs.
      In Optional Method, typically ~70% of hot conductor amps.
```

### HVAC Heat Demand (Art. 220.82(C))
```
Heating Load = (Heat Element VA × Demand Factor) + (Blower VA @ 100%)

Where:
  Demand Factor = 65% (for ≤4 units) or 40% (for >4 units)
  Blower = always 100%, never derated

Cooling Load = (CU/HP VA) + (Blower VA @ 100%)

Step 2 Applied Load = MAX(Heating Load, Cooling Load)
```

### Pool Feeder Sizing (Art. 680, 430.24)
```
Feeder Amps = (Largest Continuous Motor VA × 1.25 + Other Loads) ÷ 240V

Where:
  Largest Continuous Motor = pool pump, heater, or blower (whichever is largest)
  1.25 multiplier per NEC 430.24(A)
  Other loads = non-continuous, added at 100%
  Phase split: 120V loads → Phase A only; 240V loads → split evenly
```

### Conductor Sizing (Art. 310.16, 75°C)
```
Feeder Wire = NEC Table 310.16 @ 75°C column, sized for:
  Amps ÷ Number of Sets

Examples:
  • 100 A, 1 set, Cu → 3 AWG (115 A rating)
  • 100 A, 2 sets, Cu → 6 AWG per set (55 A each = 110 A total)
  • Parallel conductors < 1/0 AWG not permitted (NEC 310.10(H))

Neutral Wire = Sized per NEC 220.61 demand (typically 65–70% of service amps)
               But never smaller than #8 Cu or #6 Al

EGC = NEC Table 250.122 based on circuit OCPD (service breaker)
      Example: 200 A service → 6 AWG Cu or 4 AWG Al
```

## Customization

### Add an Appliance to the Default List
Edit `APPLS` array in `<script>` section:
```javascript
var APPLS = [
  // ...existing entries...
  {
    id: 'yourId',
    name: 'Your Appliance',
    qty: 1,
    va: 3000,
    volt: '240',
    canGas: true,           // can user toggle gas?
    isMotor: false,         // motor VA selection?
    vaOpts: [3000, 4000, 5000],  // quick-select VA options
    gasVA: 250              // VA when gas-enabled
  }
];
```

### Change HVAC Heat Demand Factor
Locate the line in `calc()`:
```javascript
var hf = nUnits > 4 ? 0.40 : 0.65;  // ≤4 units = 65%, >4 units = 40%
```

### Adjust Base Load Pool Demand Factor
```javascript
var baseDem = baseLoads <= 10000 
  ? baseLoads 
  : 10000 + (baseLoads - 10000) * 0.40;  // 40% — change if needed
```

### Update Generator Tables
Edit `GENS` array with your product lineup:
```javascript
var GENS = [
  ['Model Name', propane_kW, natgas_kW],
  ['AC 10KW', 10, 9],
  // ... more models ...
];
```

## Known Limitations

- **Single-phase 240V only** — no 3-phase calculations
- **No load management** — all loads assumed simultaneous
- **No derating** — ignores temperature, altitude, conductor bundling
- **Nipple rule not applicable** — designed for service entrance, not short runs
- **No demand factor for appliances** — uses raw VA per Optional Method (not Demand Factor method)
- **Imperial units only** — no metric conversions
- **US NEC 2020 only** — not compatible with other editions or international codes

## Future Enhancements

- [ ] Demand Factor Method (Art. 220.42–46) alongside Optional Method
- [ ] 3-phase service entrance support
- [ ] Load management presets (on/off toggles for "all gas kitchen", etc.)
- [ ] Temperature/altitude derating
- [ ] Feeder derating (bundling, conduit fill)
- [ ] Export to CSV/JSON for integration with other tools
- [ ] Mobile app version (PWA)
- [ ] Calculation history & project saving
- [ ] NEC 2023/2026 support
- [ ] Solar/battery load offset
- [ ] EV charging load integration

## Troubleshooting

### "Parallel warning" appears for <1/0 AWG
**Why**: NEC 310.10(H) prohibits paralleling conductors smaller than 1/0 AWG.
**Fix**: Reduce feeder sets (to 1), or select a larger service size/different conductor material.

### Gas appliance VA still showing load
**Why**: The "Gas" checkbox may not be checked, or an invalid VA override was entered.
**Fix**: Verify checkbox is ☑ checked. For gas dryers/cooktops, the calculator applies ignition/control VA only (250 VA dryer, 150 VA cooktop, 500 VA range).

### Pool feeder wire very large
**Why**: Continuous motors require 125% multiplier per NEC 430.24, plus full blower load.
**Fix**: Confirm motor sizes are correct. If oversized, reduce HP or add extra circuit feeders.

### Neutral demand higher than expected
**Why**: NEC 220.61 applies 70% to load above 200 A, which can result in ~70% of service amps.
**Fix**: This is correct per code. Neutral is the maximum *unbalanced* load, not average.

## Credits

**Built by**: Brandon @ Always On Generators  
**Based on**: NEC 2020, Chapter 2 (Wiring & Protection), Chapter 4 (Equipment)  
**Reference standards**: NFPA 70 (National Electrical Code)

## Support & Feedback

For bug reports, feature requests, or questions:
- Visit: [Always On Generators Hub](https://brandonaog.github.io/AOG-hub/)

## License

Open source for field use and educational purposes. Feel free to fork, modify, and share — credit appreciated.

---

**Last Updated**: 2024  
**NEC Edition**: 2020  
**Status**: Production Ready ✅  
**Tested**: Chrome, Firefox, Safari, Edge (desktop & mobile)

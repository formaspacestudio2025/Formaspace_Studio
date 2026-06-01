const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  LevelFormat, PageBreak, PageNumber, Header, Footer, TabStopType,
  TabStopPosition, UnderlineType
} = require('docx');
const fs = require('fs');

// ─── COLOURS ──────────────────────────────────────────────────────────────
const C = {
  navy:       '1B3A5C',
  blue:       '2563EB',
  lightBlue:  'DBEAFE',
  teal:       '0F766E',
  lightTeal:  'CCFBF1',
  amber:      'B45309',
  lightAmber: 'FEF3C7',
  red:        '991B1B',
  lightRed:   'FEE2E2',
  green:      '166534',
  lightGreen: 'DCFCE7',
  purple:     '6B21A8',
  lightPurple:'F3E8FF',
  gray:       '374151',
  lightGray:  'F3F4F6',
  midGray:    'D1D5DB',
  white:      'FFFFFF',
};

const border = (color = C.midGray) => ({ style: BorderStyle.SINGLE, size: 1, color });
const borders = (color) => ({ top: border(color), bottom: border(color), left: border(color), right: border(color) });
const noBorder = () => ({ style: BorderStyle.NONE, size: 0, color: 'FFFFFF' });
const noBorders = () => ({ top: noBorder(), bottom: noBorder(), left: noBorder(), right: noBorder() });

const W = 9360; // content width in DXA (US Letter, 1" margins)

// ─── HELPERS ──────────────────────────────────────────────────────────────
const p = (children, opts = {}) => new Paragraph({ children, ...opts });
const t = (text, opts = {}) => new TextRun({ text, font: 'Arial', ...opts });
const br = () => new Paragraph({ children: [new PageBreak()] });
const sp = (before = 80, after = 80) => ({ spacing: { before, after } });
const gap = (size = 120) => new Paragraph({ children: [t('')], spacing: { before: 0, after: size } });

const h1 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_1, children: [t(text, { bold: true, color: C.white, size: 32, font: 'Arial' })],
  shading: { fill: C.navy, type: ShadingType.CLEAR },
  spacing: { before: 0, after: 160 },
  indent: { left: 120, right: 120 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.blue, space: 1 } }
});

const h2 = (text, color = C.navy) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  children: [t(text, { bold: true, color, size: 26, font: 'Arial' })],
  spacing: { before: 280, after: 100 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 3, color, space: 1 } }
});

const h3 = (text, color = C.gray) => new Paragraph({
  heading: HeadingLevel.HEADING_3,
  children: [t(text, { bold: true, color, size: 22, font: 'Arial' })],
  spacing: { before: 180, after: 80 }
});

const body = (text, opts = {}) => new Paragraph({
  children: [t(text, { size: 20, color: C.gray, font: 'Arial', ...opts })],
  spacing: { before: 60, after: 60 }
});

const bullet = (text, indent = 0) => new Paragraph({
  numbering: { reference: 'bullets', level: indent },
  children: [t(text, { size: 20, color: C.gray, font: 'Arial' })],
  spacing: { before: 40, after: 40 }
});

const numbered = (text, indent = 0) => new Paragraph({
  numbering: { reference: 'numbers', level: indent },
  children: [t(text, { size: 20, color: C.gray, font: 'Arial' })],
  spacing: { before: 40, after: 40 }
});

const alertBox = (label, text, fillColor, textColor) => {
  return new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: [W],
    rows: [
      new TableRow({ children: [
        new TableCell({
          borders: { top: { style: BorderStyle.SINGLE, size: 6, color: textColor }, bottom: border(C.midGray), left: { style: BorderStyle.SINGLE, size: 6, color: textColor }, right: border(C.midGray) },
          shading: { fill: fillColor, type: ShadingType.CLEAR },
          margins: { top: 120, bottom: 120, left: 180, right: 180 },
          width: { size: W, type: WidthType.DXA },
          children: [
            new Paragraph({ children: [t(label, { bold: true, size: 18, color: textColor, font: 'Arial' }), t('  ' + text, { size: 18, color: textColor, font: 'Arial' })], spacing: { before: 0, after: 0 } })
          ]
        })
      ]})
    ]
  });
};

const cell = (text, fill, textColor = C.gray, bold = false, width, align = AlignmentType.LEFT) => new TableCell({
  borders: borders(C.midGray),
  shading: { fill: fill || C.white, type: ShadingType.CLEAR },
  margins: { top: 80, bottom: 80, left: 120, right: 120 },
  width: { size: width || 1, type: width ? WidthType.DXA : WidthType.AUTO },
  children: [new Paragraph({ alignment: align, children: [t(text, { size: 18, color: textColor, bold, font: 'Arial' })], spacing: { before: 0, after: 0 } })]
});

const headerRow = (cols, widths) => new TableRow({
  tableHeader: true,
  children: cols.map((c, i) => cell(c, C.navy, C.white, true, widths ? widths[i] : null, AlignmentType.LEFT))
});

const dataRow = (cols, widths, shade = false) => new TableRow({
  children: cols.map((c, i) => cell(c, shade ? C.lightGray : C.white, C.gray, false, widths ? widths[i] : null))
});

const phaseHeader = (phase, title, weeks, color) => new Table({
  width: { size: W, type: WidthType.DXA },
  columnWidths: [1800, 5760, 1800],
  rows: [new TableRow({ children: [
    new TableCell({
      borders: borders(color),
      shading: { fill: color, type: ShadingType.CLEAR },
      margins: { top: 100, bottom: 100, left: 160, right: 160 },
      width: { size: 1800, type: WidthType.DXA },
      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [t(phase, { bold: true, size: 22, color: C.white, font: 'Arial' })], spacing: { before: 0, after: 0 } })]
    }),
    new TableCell({
      borders: borders(color),
      shading: { fill: C.white, type: ShadingType.CLEAR },
      margins: { top: 100, bottom: 100, left: 160, right: 160 },
      width: { size: 5760, type: WidthType.DXA },
      children: [new Paragraph({ children: [t(title, { bold: true, size: 22, color: color, font: 'Arial' })], spacing: { before: 0, after: 0 } })]
    }),
    new TableCell({
      borders: borders(color),
      shading: { fill: C.lightGray, type: ShadingType.CLEAR },
      margins: { top: 100, bottom: 100, left: 160, right: 160 },
      width: { size: 1800, type: WidthType.DXA },
      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [t(weeks, { size: 20, color: C.gray, font: 'Arial' })], spacing: { before: 0, after: 0 } })]
    }),
  ]})]
});

const taskRow = (num, task, file, acceptance, priority) => {
  const priColor = { P0: C.red, P1: C.amber, P2: C.teal }[priority] || C.gray;
  const priFill  = { P0: C.lightRed, P1: C.lightAmber, P2: C.lightTeal }[priority] || C.lightGray;
  return new TableRow({ children: [
    new TableCell({
      borders: borders(C.midGray), shading: { fill: C.lightGray, type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 100, right: 100 }, width: { size: 400, type: WidthType.DXA },
      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [t(String(num), { bold: true, size: 18, color: C.navy, font: 'Arial' })], spacing: { before: 0, after: 0 } })]
    }),
    new TableCell({
      borders: borders(C.midGray), shading: { fill: C.white, type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 120, right: 80 }, width: { size: 2800, type: WidthType.DXA },
      children: [new Paragraph({ children: [t(task, { bold: true, size: 18, color: C.gray, font: 'Arial' })], spacing: { before: 0, after: 0 } })]
    }),
    new TableCell({
      borders: borders(C.midGray), shading: { fill: C.white, type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 80, right: 80 }, width: { size: 2560, type: WidthType.DXA },
      children: [new Paragraph({ children: [t(file, { size: 17, color: C.teal, font: 'Courier New' })], spacing: { before: 0, after: 0 } })]
    }),
    new TableCell({
      borders: borders(C.midGray), shading: { fill: C.white, type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 80, right: 80 }, width: { size: 2800, type: WidthType.DXA },
      children: [new Paragraph({ children: [t(acceptance, { size: 17, color: C.gray, font: 'Arial' })], spacing: { before: 0, after: 0 } })]
    }),
    new TableCell({
      borders: borders(C.midGray), shading: { fill: priFill, type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 80, right: 80 }, width: { size: 800, type: WidthType.DXA },
      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [t(priority, { bold: true, size: 17, color: priColor, font: 'Arial' })], spacing: { before: 0, after: 0 } })]
    }),
  ]});
};

const taskTable = (rows) => new Table({
  width: { size: W, type: WidthType.DXA },
  columnWidths: [400, 2800, 2560, 2800, 800],
  rows: [
    headerRow(['#', 'Task', 'File / Service', 'Acceptance criteria', 'Priority'], [400, 2800, 2560, 2800, 800]),
    ...rows
  ]
});

// ─── DOCUMENT ─────────────────────────────────────────────────────────────
const doc = new Document({
  numbering: {
    config: [
      { reference: 'bullets', levels: [
        { level: 0, format: LevelFormat.BULLET, text: '\u2022', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 560, hanging: 280 } } } },
        { level: 1, format: LevelFormat.BULLET, text: '\u25E6', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 1120, hanging: 280 } } } },
      ]},
      { reference: 'numbers', levels: [
        { level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 560, hanging: 280 } } } },
        { level: 1, format: LevelFormat.LOWER_LETTER, text: '%2)', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 1120, hanging: 280 } } } },
      ]},
    ]
  },
  styles: {
    default: { document: { run: { font: 'Arial', size: 20 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 32, bold: true, font: 'Arial', color: C.white },
        paragraph: { spacing: { before: 0, after: 160 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 26, bold: true, font: 'Arial', color: C.navy },
        paragraph: { spacing: { before: 280, after: 100 }, outlineLevel: 1 } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 22, bold: true, font: 'Arial', color: C.gray },
        paragraph: { spacing: { before: 180, after: 80 }, outlineLevel: 2 } },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1080, right: 1440, bottom: 1080, left: 1440 }
      }
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: C.navy, space: 1 } },
            children: [
              t('Enterprise FM Platform — Full Implementation Plan', { bold: true, size: 18, color: C.navy, font: 'Arial' }),
              t('          360° AI + SAP ERP + German Market', { size: 17, color: C.gray, font: 'Arial' }),
            ],
            spacing: { before: 0, after: 100 }
          })
        ]
      })
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            border: { top: { style: BorderStyle.SINGLE, size: 4, color: C.midGray, space: 1 } },
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
            children: [
              t('Confidential — Enterprise Development Roadmap', { size: 16, color: C.gray, font: 'Arial' }),
              t('\t'),
              t('Page ', { size: 16, color: C.gray, font: 'Arial' }),
              new PageNumber({ font: 'Arial', size: 16, color: C.gray }),
            ],
            spacing: { before: 100, after: 0 }
          })
        ]
      })
    },
    children: [

      // ── COVER ─────────────────────────────────────────────────────────
      new Table({
        width: { size: W, type: WidthType.DXA },
        columnWidths: [W],
        rows: [new TableRow({ children: [
          new TableCell({
            borders: noBorders(),
            shading: { fill: C.navy, type: ShadingType.CLEAR },
            margins: { top: 600, bottom: 600, left: 400, right: 400 },
            width: { size: W, type: WidthType.DXA },
            children: [
              new Paragraph({ alignment: AlignmentType.CENTER, children: [t('ENTERPRISE FM PLATFORM', { bold: true, size: 48, color: C.white, font: 'Arial' })], spacing: { before: 0, after: 120 } }),
              new Paragraph({ alignment: AlignmentType.CENTER, children: [t('Full Implementation Plan', { size: 32, color: 'BFDBFE', font: 'Arial' })], spacing: { before: 0, after: 80 } }),
              new Paragraph({ alignment: AlignmentType.CENTER, children: [t('360\u00B0 Spatial AI \u00B7 SAP ERP Integration \u00B7 German Enterprise Market', { size: 22, color: 'BFDBFE', font: 'Arial' })], spacing: { before: 0, after: 200 } }),
              new Paragraph({ alignment: AlignmentType.CENTER, children: [t('20 Phases \u00B7 36 Weeks \u00B7 Production-Ready', { bold: true, size: 20, color: C.lightAmber.replace('FEF3C7', 'FCD34D'), font: 'Arial' })], spacing: { before: 0, after: 0 } }),
            ]
          })
        ]})]
      }),
      gap(200),

      // ── EXECUTIVE SUMMARY ─────────────────────────────────────────────
      h1('Executive summary'),
      body('This document is the definitive implementation roadmap for building an enterprise-grade 360\u00B0 Facility Management (FM) SaaS platform targeting the German enterprise market. It synthesises three strategic layers:'),
      gap(60),
      bullet('Technical: YOLO + VLM cascaded AI detection pipeline, SAP PM/RE-FX bidirectional integration, gnomonic projection for sub-pixel asset placement'),
      bullet('Commercial: German regulatory compliance (GDPR, CSRD, GoBD, UVV/DGUV, ZUGFeRD/XRechnung), enterprise CAFM positioning against Planon and Spacewell'),
      bullet('Operational: 36-week phased delivery with per-task acceptance criteria, file paths, and priority ratings'),
      gap(100),
      alertBox('\u26A0\uFE0F  Sequencing logic:', 'Phases are ordered by commercial defensibility, not technical ease. Phase 0 compliance work must ship before any enterprise demo. Phase 1 SAP read-sync is the demo milestone. Write capabilities and AI features follow.', C.lightAmber, C.amber),
      gap(100),

      // ── PLATFORM OVERVIEW ─────────────────────────────────────────────
      h2('Platform vision'),
      body('You are building the only FM platform that combines immersive 360\u00B0 spatial documentation with AI asset detection and a full CAFM/IWMS feature set. No competitor (Planon, Spacewell, Archibus, IQ Facility) has this combination. The 360\u00B0 viewer is your moat \u2014 every feature decision must reinforce it.'),
      gap(60),

      new Table({
        width: { size: W, type: WidthType.DXA },
        columnWidths: [3120, 3120, 3120],
        rows: [
          headerRow(['Unique differentiator', 'What it replaces', 'Revenue pitch'], [3120, 3120, 3120]),
          dataRow(['360\u00B0 spatial CMMS', 'Site visit reports', 'Reduce site visits 60%'], [3120, 3120, 3120]),
          dataRow(['AI asset auto-detection', 'Manual asset surveys', 'Asset survey in hours not weeks'], [3120, 3120, 3120], true),
          dataRow(['Visual inspection audit trail', 'Paper-based inspections', 'Legal evidence for insurance/audits'], [3120, 3120, 3120]),
          dataRow(['Live IoT overlay in 360\u00B0', 'Separate BMS dashboards', 'Single pane of glass for operators'], [3120, 3120, 3120], true),
        ]
      }),
      gap(120),

      // ── MARKET CONTEXT ────────────────────────────────────────────────
      h2('German market context'),
      body('The German FM market is projected to grow from \u20AC2.6B (2024) to \u20AC6.15B by 2035 (CAGR 8.1%). Three regulatory mandates create immediate entry points:'),
      gap(60),
      new Table({
        width: { size: W, type: WidthType.DXA },
        columnWidths: [2200, 4360, 2800],
        rows: [
          headerRow(['Regulation', 'Requirement', 'Your feature response'], [2200, 4360, 2800]),
          dataRow(['CSRD (2025)', 'Scope 1/2/3 GHG reporting per building', 'Energy module + ESG dashboard'], [2200, 4360, 2800]),
          dataRow(['ZUGFeRD/XRechnung (2025)', 'Machine-readable e-invoices for B2B', 'E-invoice generation from work orders'], [2200, 4360, 2800], true),
          dataRow(['GoBD', 'Immutable audit trail for accounting-adjacent data', 'Append-only event log on all entities'], [2200, 4360, 2800]),
          dataRow(['UVV/DGUV', 'Mandatory asset safety inspections', 'UVV inspection protocols + certificates'], [2200, 4360, 2800], true),
          dataRow(['GDPR', 'Data residency, right to erasure, DPA', 'On-prem option + data export + DPA template'], [2200, 4360, 2800]),
        ]
      }),
      gap(200),
      br(),

      // ════════════════════════════════════════════════════════════════
      //  PHASE 0
      // ════════════════════════════════════════════════════════════════
      h1('Phase 0 \u2014 Compliance & legal foundation (Weeks 1\u20133)'),
      body('These tasks must complete before any enterprise demo or pilot. German procurement committees check compliance posture first. A single "no" answer on GDPR or GoBD disqualifies you immediately.'),
      gap(100),
      alertBox('\u26D4  Hard gate:', 'Do not show the product to any enterprise prospect until every Phase 0 task is complete. These are not features \u2014 they are entry tickets.', C.lightRed, C.red),
      gap(120),

      h2('0.1  GDPR & data sovereignty architecture'),
      body('Decision: offer both a cloud (EU-only region, Frankfurt data centre) and a self-hosted on-premise Docker Compose deployment. Document the choice in a Data Processing Agreement (DPA) template customers sign before onboarding.'),
      gap(80),
      taskTable([
        taskRow(1, 'Deployment mode selector', 'docker-compose.yml / .env', 'DEPLOYMENT_MODE=cloud|onprem env var controls all data residency logic', 'P0'),
        taskRow(2, 'EU-only cloud region lock', 'infra/terraform/main.tf', 'All resources deploy to eu-central-1 (Frankfurt). CI check blocks non-EU regions', 'P0'),
        taskRow(3, 'Data Processing Agreement template', 'legal/DPA-template-DE.docx', 'German-language DPA, GDPR Art. 28 compliant, reviewed by DE counsel', 'P0'),
        taskRow(4, 'Right-to-erasure API endpoint', 'api/gdpr/erasure.service.ts', 'POST /gdpr/erasure anonymises all PII for a user within 30 days. Logged.', 'P0'),
        taskRow(5, 'Data export (portability)', 'api/gdpr/export.service.ts', 'GET /gdpr/export returns ZIP of all user data in JSON + CSV within 72h', 'P0'),
      ]),
      gap(100),

      h2('0.2  GoBD-compliant audit trail'),
      body('Every create, update, and delete on every entity must be logged with: user ID, timestamp (UTC), entity type, entity ID, changed fields (before/after values), IP address. This log is append-only \u2014 no deletes, no updates.'),
      gap(80),
      taskTable([
        taskRow(6, 'Audit event table migration', 'db/migrations/0XX_audit_events.sql', 'Table: id, user_id, entity_type, entity_id, action, payload JSONB, created_at. No UPDATE/DELETE grants on this table.', 'P0'),
        taskRow(7, 'Audit middleware (Express)', 'middleware/audit.middleware.ts', 'Intercepts all POST/PATCH/DELETE. Writes audit event before response. Failure to write = 500, not silent.', 'P0'),
        taskRow(8, 'Audit log viewer (admin UI)', 'src/pages/admin/AuditLog.tsx', 'Table with filter by entity, user, date range. Export to PDF. GoBD requires 10-year retention.', 'P0'),
        taskRow(9, 'PostgreSQL row-level security', 'db/migrations/0XX_rls.sql', 'RLS policies: tenants can only read their own data. Audit table: insert-only policy.', 'P0'),
      ]),
      gap(100),

      h2('0.3  Full data export completeness'),
      body('German enterprises will never fully trust a vendor who holds their data without a clear exit path. Export capability is a procurement trust signal, not a feature.'),
      gap(80),
      taskTable([
        taskRow(10, 'Universal CSV/Excel export', 'api/export/export.service.ts', 'Every data entity (assets, issues, work orders, inspections) exportable to XLSX and CSV via API', 'P0'),
        taskRow(11, 'Complete PDF report engine', 'api/reports/pdf.service.ts', 'Branded PDF for: asset registry, inspection reports, work order history, SLA summary. Uses Puppeteer.', 'P0'),
        taskRow(12, 'Backup & restore documentation', 'docs/backup-restore.md', 'Runbook for customer on-prem backups. pg_dump schedule, S3 upload, restore procedure tested.', 'P0'),
      ]),
      gap(200),
      br(),

      // ════════════════════════════════════════════════════════════════
      //  PHASE 1
      // ════════════════════════════════════════════════════════════════
      h1('Phase 1 \u2014 SAP integration (Weeks 1\u20136)'),
      body('The SAP integration is the single biggest commercial unlock. Build it as a standalone microservice. Ship the read-only asset sync first \u2014 that alone removes the \u201Csilo\u201D objection in 80% of enterprise demos.'),
      gap(100),
      alertBox('\u2139\uFE0F  Architecture decision:', 'Build sap-adapter/ as a separate Express microservice. FM backend calls it via internal HTTP. This lets you swap SAP transport (OData vs RFC vs BTP) without touching FM business logic.', C.lightBlue, C.blue),
      gap(120),

      h2('1.1  SAP adapter microservice foundation'),
      taskTable([
        taskRow(13, 'SAP adapter service scaffold', 'sap-adapter/src/index.ts', 'Express service on port 3002. Health endpoint tests SAP connection and returns latency. Dockerised.', 'P0'),
        taskRow(14, 'OData client (S/4HANA Cloud)', 'sap-adapter/src/clients/odata.client.ts', 'Axios client with CSRF token refresh on 403, retry logic, request/response logging', 'P0'),
        taskRow(15, 'RFC client (SAP ECC legacy)', 'sap-adapter/src/clients/rfc.client.ts', 'node-rfc pool (max 20 connections). Always calls BAPI_TRANSACTION_COMMIT after writes.', 'P0'),
        taskRow(16, 'Connection config admin UI', 'src/pages/admin/SapConfig.tsx', 'SAP hostname, system ID, client, credentials, mode (OData/RFC). Test connection button. Encrypted storage.', 'P0'),
        taskRow(17, 'SAP sync tracking tables', 'db/migrations/0XX_sap_sync.sql', 'sap_asset_sync, sap_notification_log, sap_work_order_sync tables. sap_equnr on assets table.', 'P0'),
      ]),
      gap(100),

      h2('1.2  Asset master sync (SAP \u2192 FM, read-only) \u2014 Demo milestone'),
      taskTable([
        taskRow(18, 'Functional location import', 'sap-adapter/src/sync/funcloc.sync.ts', 'Pull SAP FLOC hierarchy via BAPI_FUNCLOC_GETLIST. Map to scene/floor structure. Show TPLNR in 360\u00B0 viewer sidebar.', 'P0'),
        taskRow(19, 'Equipment master import', 'sap-adapter/src/sync/equipment.sync.ts', 'Pull all equipment per FLOC. Create/update FM assets. Nightly cron at 02:00. Delta hash to skip unchanged records.', 'P0'),
        taskRow(20, 'SAP data field mapper', 'sap-adapter/src/mappers/equipment.mapper.ts', 'Maps: ManufacturerName, SerialNumber, InstallDate, WarrantyEnd, CostCenter, Plant \u2192 FM asset schema.', 'P0'),
        taskRow(21, '\u201CSAP Synced\u201D UI badge', 'src/components/assets/AssetCard.tsx', 'Lock icon on SAP-sourced fields. \u201CLast synced 3m ago\u201D tooltip. \u201CManual sync\u201D button in admin.', 'P1'),
      ]),
      gap(100),

      h2('1.3  Issue \u2192 SAP notification push (FM \u2192 SAP write)'),
      taskTable([
        taskRow(22, 'PM notification creation', 'sap-adapter/src/sync/notification.sync.ts', 'On FM issue create: call BAPI_ALM_NOTIF_CREATE, store QMNUM on issue. Retry queue on failure. Never blocks issue creation.', 'P0'),
        taskRow(23, 'Severity \u2192 damage code mapping', 'sap-adapter/src/config/damage-codes.ts', 'Configurable admin mapping: FM severity \u2192 SAP cause codes. Defaults: critical\u2192BREAKDOWN, high\u2192DEFECT.', 'P1'),
        taskRow(24, 'SAP notification link in UI', 'src/components/issues/IssueDetail.tsx', '\u201CSAP Notif: 200001234\u201D clickable link in issue sidebar. Deep-link to SAP Fiori if URL configured.', 'P1'),
        taskRow(25, 'Outbound retry queue', 'sap-adapter/src/queue/outbound.queue.ts', 'Bull queue for failed SAP pushes. 3 retries, exponential backoff. Dead-letter queue with admin notification.', 'P0'),
      ]),
      gap(100),

      h2('1.4  Work order status sync (bidirectional)'),
      taskTable([
        taskRow(26, 'Work order status poll', 'sap-adapter/src/sync/workorder.sync.ts', 'Poll API_MAINTENANCEORDER_SRV every 5min for open orders linked to FM assets. Map SAP status codes to FM statuses.', 'P1'),
        taskRow(27, 'Cost center sync', 'sap-adapter/src/sync/costcenter.sync.ts', 'Import cost center hierarchy from SAP CO module. Cost center picker on work order creation. Budget vs actual display.', 'P1'),
        taskRow(28, 'Vendor (Business Partner) sync', 'sap-adapter/src/sync/vendor.sync.ts', 'Pull vendor master from API_BUSINESS_PARTNER. Import as FM vendors. Actual labor/material costs flow back.', 'P1'),
      ]),
      gap(200),
      br(),

      // ════════════════════════════════════════════════════════════════
      //  PHASE 2
      // ════════════════════════════════════════════════════════════════
      h1('Phase 2 \u2014 AI detection pipeline (Weeks 3\u20138)'),
      body('The YOLO + VLM cascaded pipeline is your core technical differentiator. Build it in parallel with Phase 1 (different developer). Ship gnomonic projection first \u2014 it fixes the existing detection accuracy before adding VLM cost.'),
      gap(100),

      h2('2.1  Gnomonic projection engine'),
      taskTable([
        taskRow(29, 'gnomonic.util.ts \u2014 forward + inverse', 'detection/src/utils/gnomonic.util.ts', 'Forward: sphere\u2192pixel. Inverse: pixel\u2192sphere. Round-trip test: \u22640.02\u00B0 error for 1000 random points including \u00B185\u00B0 pitch.', 'P0'),
        taskRow(30, 'extractGnomonicRegion()', 'detection/src/utils/patch.util.ts', 'Replaces sharp.extract(). Outputs 640\u00D7640 JPEG via bicubic resampling. Supports 45\u00B0 and 90\u00B0 FOV modes.', 'P0'),
        taskRow(31, 'Zenith/nadir stress test', 'detection/tests/gnomonic.test.ts', 'Detect assets at pitch=\u00B180\u00B0. Assert recall \u226585% (vs ~30% without projection). Automated in CI.', 'P0'),
      ]),
      gap(100),

      h2('2.2  YOLO proposal mode'),
      taskTable([
        taskRow(32, 'YOLOv8 proposal mode params', 'detection/src/services/yolo.service.ts', 'conf=0.10, iou=0.45, max_det=20. Batch inference: group all viewport patches into single YOLO call.', 'P0'),
        taskRow(33, 'rankCandidates() function', 'detection/src/utils/ranking.util.ts', 'Score = conf \u00D7 sqrt(area_norm) \u00D7 classWeight[cls]. NMS dedup (IoU>0.5). Returns top 5 per viewport.', 'P0'),
        taskRow(34, 'pHash crop deduplication', 'detection/src/utils/hash.util.ts', 'Perceptual hash before VLM call. Cache hit skips API call. Target: 30\u201340% reduction in VLM spend.', 'P1'),
      ]),
      gap(100),

      h2('2.3  VLM refinement stage'),
      taskTable([
        taskRow(35, 'VLM provider abstraction', 'detection/src/services/vlm.service.ts', 'IVlmProvider interface. Implementations: ClaudeProvider (primary), OpenAIProvider (fallback). Circuit breaker: switch on >5% error rate or >6s latency.', 'P0'),
        taskRow(36, 'Structured JSON prompt', 'detection/src/prompts/asset-detection.prompt.ts', 'Returns: verified, verified_class, confidence, exact_center_xy, condition, manufacturer, model_number, service_due, notes. Version-controlled prompt file.', 'P0'),
        taskRow(37, 'Sub-pixel spherical remap', 'detection/src/utils/remap.util.ts', 'gnomonicInverse(vlm_center_xy, patch) \u2192 (yaw, pitch). Round-trip error <0.02\u00B0. Replaces YOLO bbox center.', 'P0'),
        taskRow(38, 'Ghost marker WebSocket events', 'detection/src/ws/detection.gateway.ts', 'Emit MARKER_GHOST at ~200ms (YOLO). Emit MARKER_VERIFIED or MARKER_REJECTED after VLM (~2s). Concurrent Promise.all() with limiter(5).', 'P0'),
        taskRow(39, 'VLM usage cost tracker', 'detection/src/services/cost-tracker.ts', 'Log tokens/cost per scan to DB. Admin dashboard shows monthly VLM spend. Alert at configurable threshold.', 'P1'),
      ]),
      gap(100),

      h2('2.4  Detection marker UI'),
      taskTable([
        taskRow(40, 'Ghost marker state', 'src/components/viewer/DetectionMarker.tsx', 'Pulsing amber ring at 40% opacity. Shows YOLO class + \u201C?\u201D. Draggable during VLM wait.', 'P0'),
        taskRow(41, 'Refining state animation', 'src/components/viewer/DetectionMarker.tsx', 'Arc spinner, \u201CRefining with AI\u2026\u201D tooltip. Smooth position update via CSS transition 300ms on VLM result.', 'P0'),
        taskRow(42, 'Verified marker + metadata pre-fill', 'src/components/viewer/DetectionMarker.tsx', '\u201CVLM Verified\u201D badge. Condition chip. Clicking \u201C+Asset\u201D pre-fills form with VLM metadata. Condition color chip.', 'P0'),
        taskRow(43, 'Calibration scene benchmark', 'detection/tests/calibration.test.ts', '10 hand-pinned ground-truth assets. Assert: position error <0.5\u00B0, class accuracy >95%, FPR <5%.', 'P0'),
      ]),
      gap(200),
      br(),

      // ════════════════════════════════════════════════════════════════
      //  PHASE 3
      // ════════════════════════════════════════════════════════════════
      h1('Phase 3 \u2014 German compliance features (Weeks 5\u201310)'),
      body('These are the features that turn a demo into a signed contract in Germany. UVV inspections, CSRD energy reporting, and e-invoicing are legal mandates \u2014 not differentiators. Not having them is disqualifying.'),
      gap(100),

      h2('3.1  UVV / DGUV inspection protocol engine'),
      body('UVV = Unfallverh\u00FCtungsvorschrift. Legal mandatory safety inspections for assets in German workplaces. BGV A3 (electrical), DGUV V3, DGUV V4, DGUV V54 \u2014 each has specific intervals and certificate requirements.'),
      gap(80),
      taskTable([
        taskRow(44, 'Inspection protocol schema', 'db/migrations/0XX_inspections.sql', 'Tables: inspection_protocols, inspection_items, inspection_runs, inspection_signatures. Support checklist trees.', 'P0'),
        taskRow(45, 'UVV protocol library', 'src/data/uvv-protocols/', 'Pre-built JSON protocol templates: BGV-A3, DGUV-V3, DGUV-V54, fire extinguisher (DIN EN 3). Admin-customisable.', 'P0'),
        taskRow(46, 'Asset inspection schedule', 'api/inspections/schedule.service.ts', 'Auto-schedule inspections based on asset class and protocol interval. Overdue alert 30/7/1 days before.', 'P0'),
        taskRow(47, 'Inspection mobile workflow', 'src/pages/inspection/InspectionRunner.tsx', 'Checklist UI: pass/fail/na per item, photo attachment, signature capture. Works offline (Phase 5 completes this).', 'P0'),
        taskRow(48, 'Certificate PDF generation', 'api/inspections/certificate.service.ts', 'Generate DIN A4 inspection certificate with: asset details, inspector name, date, results, signature. Branded.', 'P0'),
        taskRow(49, 'SAP measurement document push', 'sap-adapter/src/sync/inspection.sync.ts', 'Push inspection results to SAP PM as measurement documents via IK01/BAPI_MEASDOC_CREATE. Links to asset.', 'P1'),
      ]),
      gap(100),

      h2('3.2  CSRD / ESG energy reporting module'),
      body('The EU Corporate Sustainability Reporting Directive (CSRD) requires large German companies to report Scope 1, 2, and 3 greenhouse gas emissions from 2025. Your 360\u00B0 viewer, linked to IoT sensor data, is uniquely positioned to deliver this.'),
      gap(80),
      taskTable([
        taskRow(50, 'Energy data schema', 'db/migrations/0XX_energy.sql', 'Tables: energy_readings (asset_id, timestamp, kwh, source), ghg_factors (country, year, scope, factor)', 'P0'),
        taskRow(51, 'Manual energy entry UI', 'src/pages/energy/EnergyEntry.tsx', 'Per-asset, per-meter manual kWh entry. Import from CSV (utility bill format). Monthly view with trend.', 'P0'),
        taskRow(52, 'GHG Scope 1/2/3 calculator', 'api/energy/ghg.service.ts', 'Apply DEFRA/UBA emission factors. Calculate CO\u2082e per asset, floor, building, portfolio. Monthly and annual totals.', 'P0'),
        taskRow(53, 'CSRD export report', 'api/reports/csrd.service.ts', 'Export: Scope breakdown table, intensity metrics (kgCO\u2082e/m\u00B2), year-on-year comparison, ESRS-E1 narrative template.', 'P0'),
        taskRow(54, 'Energy dashboard in 360\u00B0 viewer', 'src/components/viewer/EnergyOverlay.tsx', 'Colour-code scenes by energy intensity. Click asset \u2192 see its kWh trend. IoT integration in Phase 4.', 'P1'),
      ]),
      gap(100),

      h2('3.3  E-invoicing: ZUGFeRD 2.3 / XRechnung'),
      body('German B2B e-invoicing is mandatory from January 2025 (OZG-RE consolidation). Every vendor work order that generates payment must produce a ZUGFeRD/XRechnung-compliant XML invoice.'),
      gap(80),
      taskTable([
        taskRow(55, 'ZUGFeRD XML generator', 'api/invoicing/zugferd.service.ts', 'Generates valid ZUGFeRD 2.3 EN16931 XML. Fields: seller/buyer VAT, line items, AUFNR reference, payment terms.', 'P0'),
        taskRow(56, 'PDF/A-3 invoice embedding', 'api/invoicing/invoice.service.ts', 'Embed XML into PDF/A-3b (ZUGFeRD hybrid format) using Puppeteer + pdf-lib. One file, two formats.', 'P0'),
        taskRow(57, 'XRechnung pure XML output', 'api/invoicing/xrechnung.service.ts', 'Alternative pure-XML output for public sector customers (Peppol BIS Billing 3.0 compatible).', 'P0'),
        taskRow(58, 'Invoice trigger on work order close', 'api/work-orders/workorder.service.ts', 'On work order status \u2192 completed: auto-generate invoice draft. Reviewer approves before send. Email delivery.', 'P1'),
      ]),
      gap(200),
      br(),

      // ════════════════════════════════════════════════════════════════
      //  PHASE 4
      // ════════════════════════════════════════════════════════════════
      h1('Phase 4 \u2014 Enterprise operations (Weeks 8\u201316)'),
      body('This phase builds the operational depth that German FM companies need to run daily operations through the platform. These features drive daily active usage \u2014 the metric that determines contract renewal.'),
      gap(100),

      h2('4.1  Vendor portal'),
      taskTable([
        taskRow(59, 'Vendor entity + CRUD', 'api/vendors/vendor.service.ts', 'Vendors: name, VAT number, certifications, trade types, SLA terms, bank details (encrypted). CRUD + search.', 'P1'),
        taskRow(60, 'Vendor portal login', 'src/pages/vendor-portal/', 'Separate subdomain (vendor.yourplatform.de). Read work orders, update status, upload completion photos, submit invoices.', 'P1'),
        taskRow(61, 'Vendor performance dashboard', 'src/pages/vendors/VendorKPIs.tsx', 'Response time vs SLA, completion rate, average cost per work order type. Export for contract reviews.', 'P1'),
        taskRow(62, 'Vendor certification tracking', 'api/vendors/certification.service.ts', 'Store: Handwerkskammer cert, liability insurance, trade licence. Expiry alerts. Block assignment if expired.', 'P1'),
      ]),
      gap(100),

      h2('4.2  Work order system (complete)'),
      taskTable([
        taskRow(63, 'Work order full CRUD', 'api/work-orders/workorder.service.ts', 'Create from issue or asset. Fields: priority, category, assigned vendor, estimated cost, due date, SLA class.', 'P0'),
        taskRow(64, 'Work order calendar view', 'src/pages/work-orders/WorkOrderCalendar.tsx', 'Monthly/weekly calendar of scheduled work orders. Drag to reschedule. Vendor workload heatmap.', 'P1'),
        taskRow(65, 'Preventive maintenance scheduler', 'api/maintenance/schedule.service.ts', 'Rule-based scheduler: asset class + interval \u2192 auto-create work orders. Links to UVV protocol intervals.', 'P1'),
        taskRow(66, 'Work order cost tracking', 'api/work-orders/cost.service.ts', 'Labor hours, material costs, external service costs. Budget vs actual per cost center. SAP settlement on close.', 'P1'),
      ]),
      gap(100),

      h2('4.3  Notification & alerting system'),
      taskTable([
        taskRow(67, 'Notification schema + service', 'api/notifications/notification.service.ts', 'Events: SLA breach, work order overdue, inspection due, asset critical condition, VLM detection complete.', 'P0'),
        taskRow(68, 'In-app notification centre', 'src/components/layout/NotificationPanel.tsx', 'Bell icon with badge. Notification list with read/unread. Mark all read. Click \u2192 deep link to entity.', 'P0'),
        taskRow(69, 'Email notification engine', 'api/notifications/email.service.ts', 'Transactional email via Resend/SendGrid. German HTML templates. Unsubscribe link (GDPR required).', 'P0'),
        taskRow(70, 'Webhook outbound API', 'api/webhooks/webhook.service.ts', 'Customer-configured webhooks for events. HMAC-SHA256 signing. Retry with exponential backoff. Delivery log.', 'P1'),
      ]),
      gap(100),

      h2('4.4  Client SLA reporting portal'),
      body('FM companies sell to property owners on contractual SLA terms. Clients need their own view without access to internal operations. This is a contract renewal tool.'),
      gap(80),
      taskTable([
        taskRow(71, 'Client portal auth', 'api/auth/client-portal.service.ts', 'Separate role: client_viewer. Scoped to their property only. No access to vendor costs or internal notes.', 'P1'),
        taskRow(72, 'SLA dashboard', 'src/pages/client-portal/SLADashboard.tsx', 'Response time vs contracted SLA, open issues by severity, completed work orders, compliance certificates due.', 'P1'),
        taskRow(73, 'Client report PDF', 'api/reports/client-report.service.ts', 'Monthly PDF: property name, SLA performance, issues summary, completed maintenance, upcoming inspections. Branded.', 'P1'),
        taskRow(74, 'White-label branding', 'api/tenants/branding.service.ts', 'Per-tenant logo, primary colour, report header/footer. Client portal shows FM company\u2019s brand, not yours.', 'P2'),
      ]),
      gap(200),
      br(),

      // ════════════════════════════════════════════════════════════════
      //  PHASE 5
      // ════════════════════════════════════════════════════════════════
      h1('Phase 5 \u2014 Mobile & field operations (Weeks 10\u201316)'),
      body('The 360\u00B0 viewer is for managers. The mobile app is for the 90% of daily users \u2014 technicians, inspectors, security staff \u2014 who work in underground car parks, server rooms, and basements without connectivity.'),
      gap(100),
      alertBox('\u26A0\uFE0F  Offline-first is non-negotiable:', 'Every field workflow (QR scan, inspection, work order update) must function without internet. Sync on reconnect. A web app requiring connectivity fails the most common field scenario.', C.lightAmber, C.amber),
      gap(120),

      h2('5.1  Progressive Web App (PWA) shell'),
      taskTable([
        taskRow(75, 'Service worker + offline shell', 'src/sw.ts (Workbox)', 'Cache: app shell, asset data, inspection protocols, work orders assigned to device user. Background sync on reconnect.', 'P0'),
        taskRow(76, 'IndexedDB offline store', 'src/offline/offline.store.ts', 'Dexie.js schema: pending_actions queue, cached_assets, cached_work_orders, cached_inspections. Conflict resolution: last-write-wins with server timestamp.', 'P0'),
        taskRow(77, 'Offline indicator UI', 'src/components/layout/OfflineBanner.tsx', 'Persistent banner when offline. \u201CX pending actions\u201D count. Manual sync button. Sync progress indicator.', 'P0'),
      ]),
      gap(100),

      h2('5.2  QR code system'),
      taskTable([
        taskRow(78, 'QR code generation', 'api/assets/qr.service.ts', 'Generate QR per asset encoding: platform URL + asset ID + scene ID. Print to PDF (A4 sheet of 12, label-printer format).', 'P0'),
        taskRow(79, 'QR scanner \u2192 360\u00B0 jump', 'src/pages/qr/QRScan.tsx', 'Camera scan on mobile. Resolves asset \u2192 opens 360\u00B0 viewer at exact scene/yaw/pitch of the asset pin. Offline: opens cached data.', 'P0'),
        taskRow(80, 'QR \u2192 quick action sheet', 'src/components/qr/QuickActions.tsx', 'After scan: one-tap buttons: Log issue, Start inspection, View work orders, Report condition. Field-optimised large touch targets.', 'P0'),
      ]),
      gap(100),

      h2('5.3  Mobile inspection workflow'),
      taskTable([
        taskRow(81, 'Inspection runner (mobile)', 'src/pages/inspection/InspectionRunner.tsx', 'Full offline checklist UI. Pass/fail/NA/skip per item. Photo attachment (camera or gallery). Voice note (future).', 'P0'),
        taskRow(82, 'Digital signature capture', 'src/components/inspection/SignatureCanvas.tsx', 'HTML5 canvas signature. Stored as SVG. Embedded in PDF certificate. Legally valid in DE under eIDAS.', 'P0'),
        taskRow(83, 'Inspection sync on reconnect', 'src/offline/sync/inspection.sync.ts', 'On network restore: push completed inspections. Conflict: server version wins if inspection already submitted by another device.', 'P0'),
      ]),
      gap(200),
      br(),

      // ════════════════════════════════════════════════════════════════
      //  PHASE 6
      // ════════════════════════════════════════════════════════════════
      h1('Phase 6 \u2014 IoT & digital twin (Weeks 14\u201320)'),
      body('This phase transforms the 360\u00B0 viewer from a documentation tool into a live operational dashboard. IoT sensor data overlaid on the 360\u00B0 sphere is your strongest demo moment \u2014 no competitor has this.'),
      gap(100),

      h2('6.1  IoT ingestion layer'),
      taskTable([
        taskRow(84, 'MQTT broker integration', 'iot/src/brokers/mqtt.broker.ts', 'Subscribe to asset sensor topics. Parse: temperature, humidity, runtime hours, power draw, door open/close. Map to asset IDs.', 'P1'),
        taskRow(85, 'REST telemetry endpoint', 'api/iot/telemetry.service.ts', 'POST /iot/readings for HTTP-based sensors. API key auth. Rate limit: 1000 reads/min per asset. TimescaleDB or PG partitioned.', 'P1'),
        taskRow(86, 'Sensor \u2192 asset linkage', 'src/pages/assets/SensorLink.tsx', 'Admin UI: link sensor ID/topic to asset. Define alert thresholds per sensor type. Preview live data before linking.', 'P1'),
        taskRow(87, 'Timeseries storage', 'db/migrations/0XX_telemetry.sql', 'PostgreSQL table with time partitioning (pg_partman). 1-year hot storage, archive to S3 cold. Auto-downsample hourly/daily aggregates.', 'P1'),
      ]),
      gap(100),

      h2('6.2  Live 360\u00B0 sensor overlay'),
      taskTable([
        taskRow(88, 'Sensor heatmap in viewer', 'src/components/viewer/SensorOverlay.tsx', 'Temperature/CO\u2082 heatmap rendered over equirectangular sphere using Three.js shader. Real-time WebSocket update.', 'P1'),
        taskRow(89, 'Asset pulse indicator', 'src/components/viewer/AssetPulse.tsx', 'Asset markers pulse amber/red when sensor threshold exceeded. Click \u2192 sensor sparkline popup with 24h trend.', 'P1'),
        taskRow(90, 'Predictive maintenance trigger', 'api/iot/prediction.service.ts', 'Rule engine: runtime hours \u00D7 asset class MTBF \u2192 predicted failure date. Create pre-emptive work order 30 days before.', 'P2'),
      ]),
      gap(200),
      br(),

      // ════════════════════════════════════════════════════════════════
      //  PHASE 7
      // ════════════════════════════════════════════════════════════════
      h1('Phase 7 \u2014 AI intelligence layer (Weeks 18\u201324)'),
      body('These features are built on the data accumulated in Phases 1\u20136. Do not build them earlier \u2014 they require 3\u20136 months of operational data to be useful.'),
      gap(100),

      h2('7.1  Natural language search'),
      taskTable([
        taskRow(91, 'NL query parser', 'api/ai/nl-search.service.ts', 'Use Claude claude-sonnet-4-20250514 to parse queries like \u201CShow HVAC issues last month Berlin\u201D \u2192 structured DB query. Return results with explanation.', 'P2'),
        taskRow(92, 'Semantic asset search', 'api/ai/semantic-search.service.ts', 'Embed asset descriptions with text-embedding-3-small. pgvector cosine similarity search. \u201CFind all cooling equipment near server rooms\u201D.', 'P2'),
      ]),
      gap(100),

      h2('7.2  AI risk prediction'),
      taskTable([
        taskRow(93, 'Asset failure risk model', 'api/ai/risk.service.ts', 'Features: asset age, inspection history, condition trend, IoT anomaly count, class MTBF. Output: risk score 0\u20131 + explanation.', 'P2'),
        taskRow(94, 'Risk dashboard', 'src/pages/ai/RiskDashboard.tsx', 'Portfolio risk heatmap. Top 10 at-risk assets with predicted failure date. One-click work order creation from risk alert.', 'P2'),
        taskRow(95, 'AI issue classification', 'api/ai/classification.service.ts', 'On issue description entry: suggest type, severity, likely cause, recommended vendor trade. Confidence displayed.', 'P2'),
      ]),
      gap(200),
      br(),

      // ════════════════════════════════════════════════════════════════
      //  PHASE 8 — COMMERCIAL
      // ════════════════════════════════════════════════════════════════
      h1('Phase 8 \u2014 Commercial & go-to-market (Weeks 20\u201336)'),
      body('The product can win on features. It loses on pricing, packaging, and sales readiness. These tasks are as important as any feature.'),
      gap(100),

      h2('8.1  Multi-tenancy & pricing architecture'),
      taskTable([
        taskRow(96, 'Per-property pricing model', 'api/billing/billing.service.ts', 'Price per active property/month, not per seat. Tiers: Starter (\u22645), Business (\u226425, +SAP connector), Enterprise (unlimited, on-prem, SLA). Stripe integration.', 'P1'),
        taskRow(97, 'AI credit metering', 'api/billing/credits.service.ts', 'Track VLM detection calls per tenant. Include X credits/month in plan. Charge overages. Upsell trigger at 80% of allowance.', 'P1'),
        taskRow(98, 'Multi-tenant data isolation', 'db/migrations/0XX_tenants.sql', 'tenant_id on all tables. RLS policies enforce isolation. tenant_id in JWT. Cross-tenant queries architecturally impossible.', 'P0'),
        taskRow(99, 'ROI calculator', 'src/pages/marketing/ROICalculator.tsx', 'Inputs: properties, assets, inspections/year, current paper cost. Output: annual savings, payback period. Leave-behind for demos.', 'P1'),
      ]),
      gap(100),

      h2('8.2  German localisation'),
      taskTable([
        taskRow(100, 'i18n framework', 'src/i18n/de.json', 'react-i18next. Full German translation of all UI strings. German date format (DD.MM.YYYY), number format (1.234,56), currency (\u20AC).', 'P1'),
        taskRow(101, 'German PDF templates', 'api/reports/templates/de/', 'All PDF outputs in German: Pr\u00FCfprotokoll, Wartungsauftrag, SLA-Bericht, Zustandsbericht. Legal terminology reviewed by DE counsel.', 'P1'),
        taskRow(102, 'SEPA bank transfer support', 'api/invoicing/sepa.service.ts', 'SEPA XML (pain.001) generation for vendor payment batches. IBAN validation. Required for German FM companies managing vendor payments.', 'P2'),
      ]),
      gap(100),

      h2('8.3  Open API & partner ecosystem'),
      taskTable([
        taskRow(103, 'Public REST API', 'api/public/v1/', 'OpenAPI 3.1 spec. All core entities exposed. API key auth + OAuth 2.0. Rate limits. SDKs: TypeScript, Python auto-generated.', 'P2'),
        taskRow(104, 'Webhook system', 'api/webhooks/webhook.service.ts', 'Events: asset.created, issue.created, workorder.completed, inspection.passed/failed. HMAC signed. Retry with delivery log.', 'P1'),
        taskRow(105, 'Partner integration directory', 'docs/integrations/', 'Documented integrations: SAP PM, SAP RE-FX, Siemens Desigo CC, Honeywell BMS, Schneider EcoStruxure, Microsoft Teams.', 'P2'),
      ]),
      gap(200),
      br(),

      // ════════════════════════════════════════════════════════════════
      //  MASTER TIMELINE
      // ════════════════════════════════════════════════════════════════
      h1('Master timeline \u2014 36 weeks'),
      gap(80),
      new Table({
        width: { size: W, type: WidthType.DXA },
        columnWidths: [700, 1200, 4460, 2000, 1000],
        rows: [
          headerRow(['Weeks', 'Phase', 'Milestone', 'Sales impact', 'Dev 1/2'], [700, 1200, 4460, 2000, 1000]),
          dataRow(['1\u20133', 'Phase 0', 'GDPR + GoBD + audit trail LIVE', 'Enterprise demo ready', 'Both'], [700, 1200, 4460, 2000, 1000]),
          dataRow(['1\u20136', 'Phase 1', 'SAP asset sync + ghost markers', 'Remove silo objection', 'Dev 1'], [700, 1200, 4460, 2000, 1000], true),
          dataRow(['3\u20138', 'Phase 2', 'VLM pipeline + sub-pixel markers', 'AI demo wow moment', 'Dev 2'], [700, 1200, 4460, 2000, 1000]),
          dataRow(['5\u201310', 'Phase 3', 'UVV + CSRD + ZUGFeRD LIVE', 'Compliance = signed contracts', 'Both'], [700, 1200, 4460, 2000, 1000], true),
          dataRow(['8\u201316', 'Phase 4', 'Vendor portal + client SLA portal', 'Daily active usage', 'Dev 1'], [700, 1200, 4460, 2000, 1000]),
          dataRow(['10\u201316', 'Phase 5', 'PWA offline + QR + mobile inspection', 'Field team adoption', 'Dev 2'], [700, 1200, 4460, 2000, 1000], true),
          dataRow(['14\u201320', 'Phase 6', 'IoT ingestion + 360\u00B0 live overlay', 'Strongest demo moment', 'Dev 2'], [700, 1200, 4460, 2000, 1000]),
          dataRow(['18\u201324', 'Phase 7', 'NL search + risk prediction', 'Premium tier upsell', 'Both'], [700, 1200, 4460, 2000, 1000], true),
          dataRow(['20\u201336', 'Phase 8', 'Public API + partner channel + i18n', 'Scale beyond direct sales', 'Both'], [700, 1200, 4460, 2000, 1000]),
        ]
      }),
      gap(200),
      br(),

      // ════════════════════════════════════════════════════════════════
      //  HIRING
      // ════════════════════════════════════════════════════════════════
      h1('Hiring: senior developer requirements'),
      body('You need two senior developers with complementary specialisations. Do not hire a single developer and try to cover both tracks \u2014 the timeline requires parallel execution of Phases 1 and 2 from week 1.'),
      gap(100),

      new Table({
        width: { size: W, type: WidthType.DXA },
        columnWidths: [4680, 4680],
        rows: [
          headerRow(['Developer 1 \u2014 Backend / SAP / Enterprise', 'Developer 2 \u2014 Computer Vision / Frontend / Mobile'], [4680, 4680]),
          dataRow(['Node.js + TypeScript: 5+ years', 'React + TypeScript + Three.js: 5+ years'], [4680, 4680]),
          dataRow(['SAP integration (OData or RFC): proven production experience', 'Computer vision / ML pipeline experience'], [4680, 4680], true),
          dataRow(['PostgreSQL: complex queries, RLS, migrations', 'React Three Fiber + WebGL shader experience'], [4680, 4680]),
          dataRow(['Enterprise SaaS: multi-tenancy, RBAC, audit trails', 'PWA / Service Worker / offline-first architecture'], [4680, 4680], true),
          dataRow(['GDPR / GoBD / German compliance: strong advantage', 'Python (for YOLO/VLM pipeline): required'], [4680, 4680]),
          dataRow(['Interview Q: \u201CBuild a bidirectional SAP PM sync with conflict resolution\u201D', 'Interview Q: \u201CImplement gnomonic projection for 360\u00B0 detection\u201D'], [4680, 4680], true),
        ]
      }),
      gap(120),

      h2('Interview test scenarios'),
      numbered('SAP: \u201CHow do you handle CSRF token expiry mid-session in an OData integration?\u201D \u2014 Expected: refresh on 403, retry once, cache per tenant.'),
      numbered('Three.js: \u201CHow do you render 100+ hotspots in a single 360\u00B0 scene without frame rate drop?\u201D \u2014 Expected: instanced mesh, LOD, frustum culling.'),
      numbered('PWA: \u201CUser completes an inspection offline and reconnects. Server has a newer version of the same asset. What happens?\u201D \u2014 Expected: conflict resolution strategy.'),
      numbered('Security: \u201CHow do you prevent tenant A from reading tenant B\u2019s data?\u201D \u2014 Expected: row-level security + JWT scoping + integration test.'),
      numbered('German compliance: \u201CA customer asks if your platform is GoBD-compliant. What do you tell them and what do you show them?\u201D'),
      gap(200),
      br(),

      // ════════════════════════════════════════════════════════════════
      //  TECH STACK
      // ════════════════════════════════════════════════════════════════
      h1('Definitive technology stack'),
      gap(80),
      new Table({
        width: { size: W, type: WidthType.DXA },
        columnWidths: [2200, 3360, 3800],
        rows: [
          headerRow(['Layer', 'Technology', 'Rationale'], [2200, 3360, 3800]),
          dataRow(['Frontend viewer', 'React + Three.js + React Three Fiber', '360\u00B0 sphere rendering, hotspots, sensor overlay. Already in stack.'], [2200, 3360, 3800]),
          dataRow(['Frontend app', 'React + TypeScript + Vite + Zustand + TanStack Query', 'Already in stack. Add react-i18next for DE locale.'], [2200, 3360, 3800], true),
          dataRow(['Backend API', 'Node.js + Express + TypeScript', 'Already in stack. Add Zod for request validation.'], [2200, 3360, 3800]),
          dataRow(['SAP adapter', 'Node.js + node-rfc + axios (OData)', 'Separate microservice. node-rfc for ECC, axios+CSRF for S/4HANA.'], [2200, 3360, 3800], true),
          dataRow(['AI detection', 'Python + YOLOv8 + FastAPI', 'Separate service. Numpy/OpenCV for gnomonic projection.'], [2200, 3360, 3800]),
          dataRow(['Database', 'PostgreSQL (Neon) + pgvector + pg_partman', 'Already in stack. Add pgvector for semantic search, partman for timeseries.'], [2200, 3360, 3800], true),
          dataRow(['Job queue', 'BullMQ + Redis', 'SAP sync jobs, VLM rate limiting, notification delivery, PDF generation.'], [2200, 3360, 3800]),
          dataRow(['File storage', 'S3-compatible (eu-central-1)', '360\u00B0 images, inspection photos, generated PDFs. Presigned URLs for access.'], [2200, 3360, 3800], true),
          dataRow(['Email', 'Resend (EU region)', 'Transactional email. German templates. GDPR-compliant, EU data residency.'], [2200, 3360, 3800]),
          dataRow(['Auth', 'Clerk / JWT', 'Already in stack. Add SAML/SSO support for enterprise (Phase 8).'], [2200, 3360, 3800], true),
          dataRow(['Offline', 'Workbox PWA + Dexie.js (IndexedDB)', 'Service worker caching + offline store for field technicians.'], [2200, 3360, 3800]),
          dataRow(['Infra', 'Docker Compose (on-prem) + Terraform (cloud)', 'Both deployment modes required for German enterprise.'], [2200, 3360, 3800], true),
          dataRow(['Monitoring', 'Sentry + Grafana + Prometheus', 'Error tracking, latency dashboards, SAP sync health metrics.'], [2200, 3360, 3800]),
        ]
      }),
      gap(200),
      br(),

      // ════════════════════════════════════════════════════════════════
      //  RISK REGISTER
      // ════════════════════════════════════════════════════════════════
      h1('Risk register'),
      gap(80),
      new Table({
        width: { size: W, type: WidthType.DXA },
        columnWidths: [2600, 1200, 2000, 3560],
        rows: [
          headerRow(['Risk', 'Severity', 'Likelihood', 'Mitigation'], [2600, 1200, 2000, 3560]),
          dataRow(['SAP BASIS team blocks integration user permissions', 'Critical', 'High', 'Start SAP access request in week 1. Provide exact authorization objects list. Use sandbox until approved.'], [2600, 1200, 2000, 3560]),
          dataRow(['VLM API latency exceeds 6s under load', 'High', 'Medium', 'Circuit breaker at 6s. Provider fallback (Claude \u2192 GPT-4o \u2192 Gemini). Ghost markers hide latency from users.'], [2600, 1200, 2000, 3560], true),
          dataRow(['GDPR audit fails due to missing data residency proof', 'Critical', 'Low', 'Document EU-only deployment in DPA week 1. Terraform state shows eu-central-1 only. External audit in month 3.'], [2600, 1200, 2000, 3560]),
          dataRow(['node-rfc binary incompatibility in Docker', 'High', 'Medium', 'Use glibc >= 2.28 base image (Ubuntu 22.04). Pre-built binaries. Test in CI against target Docker image.'], [2600, 1200, 2000, 3560], true),
          dataRow(['Key developer leaves during build', 'Critical', 'Medium', 'Full documentation per module. No single-developer knowledge silos. Architecture Decision Records (ADRs) in /docs/adr/.'], [2600, 1200, 2000, 3560]),
          dataRow(['German counsel review delays compliance features', 'High', 'Medium', 'Engage counsel in week 2. Provide preliminary DPA and UVV protocol templates for review in parallel with dev.'], [2600, 1200, 2000, 3560], true),
        ]
      }),
      gap(200),
      br(),

      // ─── FINAL SECTION ────────────────────────────────────────────
      h1('Week-by-week: first 8 weeks in detail'),
      body('The first 8 weeks are the highest-risk period. This is the granular daily-level guide for that window.'),
      gap(100),

      h2('Weeks 1\u20132: Zero to demo-safe'),
      bullet('Day 1\u20133: GDPR architecture decision. Choose EU cloud region. Provision Frankfurt infrastructure. Write DPA template.'),
      bullet('Day 1\u20133 (parallel): SAP adapter scaffold. Docker Compose with sap-adapter service. /health endpoint working.'),
      bullet('Day 4\u20137: GoBD audit event table + middleware. Every API mutation writes to audit log. Verified by end of week 1.'),
      bullet('Day 4\u20137 (parallel): gnomonic.util.ts forward + inverse. Round-trip test passing. Basic patch extraction working.'),
      bullet('Day 8\u201310: SAP connection config admin UI. Test connection button calls real sandbox SAP. Encrypted credential storage.'),
      bullet('Day 8\u201310 (parallel): YOLOv8 in proposal mode (conf=0.10). Returns top-5 candidates. Ghost marker WebSocket event.'),
      bullet('Day 11\u201314: SAP Functional Location import. Equipment master pull. \u201CSAP Synced\u201D badge on asset cards. Demo milestone.'),
      bullet('Day 11\u201314 (parallel): VLM provider abstraction. Claude claude-sonnet-4-20250514 call with structured JSON prompt. Verified marker.'),
      gap(80),

      h2('Weeks 3\u20134: First write operations'),
      bullet('FM issue \u2192 SAP PM notification (BAPI_ALM_NOTIF_CREATE). Retry queue for failures. QMNUM stored on issue.'),
      bullet('UVV inspection protocol schema. BGV-A3 and DGUV-V3 templates in /src/data/uvv-protocols/. Checklist UI working.'),
      bullet('CSRD energy data schema. Manual kWh entry UI. GHG calculator with DEFRA emission factors.'),
      bullet('pHash deduplication for VLM crops. Cost tracker logging per-scan API spend.'),
      gap(80),

      h2('Weeks 5\u20136: Compliance features ship'),
      bullet('ZUGFeRD 2.3 XML generator. Test against official validation tool (Mustang Project validator).'),
      bullet('UVV certificate PDF generation. German-language template reviewed by counsel.'),
      bullet('SAP work order status poll every 5 minutes. Status badge in FM UI with \u201CLast synced N min ago\u201D.'),
      bullet('PWA service worker + IndexedDB offline store. Test: complete inspection with airplane mode on.'),
      gap(80),

      h2('Weeks 7\u20138: Full pipeline live'),
      bullet('End-to-end detection demo: 360\u00B0 upload \u2192 gnomonic patches \u2192 YOLO proposals \u2192 ghost markers \u2192 VLM refinement \u2192 verified markers \u2192 one-click asset creation.'),
      bullet('QR code generation + scan \u2192 360\u00B0 jump. Field technician workflow tested on mobile.'),
      bullet('Client SLA portal first version. Property manager login. SLA dashboard. Monthly PDF report.'),
      bullet('Calibration scene benchmark. All acceptance criteria validated. FPR <5%, position error <0.5\u00B0.'),
      gap(200),
      br(),

      // ── CLOSING ───────────────────────────────────────────────────
      new Table({
        width: { size: W, type: WidthType.DXA },
        columnWidths: [W],
        rows: [new TableRow({ children: [
          new TableCell({
            borders: { top: { style: BorderStyle.SINGLE, size: 8, color: C.blue, space: 1 }, bottom: noBorder(), left: noBorder(), right: noBorder() },
            shading: { fill: C.lightGray, type: ShadingType.CLEAR },
            margins: { top: 280, bottom: 280, left: 360, right: 360 },
            width: { size: W, type: WidthType.DXA },
            children: [
              new Paragraph({ alignment: AlignmentType.CENTER, children: [t('Ready to build.', { bold: true, size: 28, color: C.navy, font: 'Arial' })], spacing: { before: 0, after: 80 } }),
              new Paragraph({ alignment: AlignmentType.CENTER, children: [t('105 tasks. 36 weeks. One platform that no competitor has built.', { size: 20, color: C.gray, font: 'Arial' })], spacing: { before: 0, after: 60 } }),
              new Paragraph({ alignment: AlignmentType.CENTER, children: [t('360\u00B0 spatial intelligence + SAP ERP + German compliance + AI \u2014 assembled for the first time.', { size: 18, color: C.gray, font: 'Arial' })], spacing: { before: 0, after: 0 } }),
            ]
          })
        ]})]
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('/mnt/user-data/outputs/FM_Platform_Implementation_Plan.docx', buf);
  console.log('Done:', buf.length, 'bytes');
});

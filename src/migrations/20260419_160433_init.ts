import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'pl');
  CREATE TYPE "public"."enum_skills_icon" AS ENUM('cloud', 'server', 'database', 'api', 'backend', 'frontend', 'mobile', 'desktop', 'security', 'devops', 'infrastructure', 'networking', 'automation', 'ai', 'analytics', 'design', 'product', 'management', 'documentation', 'collaboration', 'performance', 'search', 'storage', 'hosting', 'cli', 'cms', 'architecture', 'operations', 'testing', 'monitoring', 'observability', 'deployment', 'integration', 'workflow', 'research', 'seo', 'marketing', 'sales', 'crm', 'finance', 'support', 'qa', 'data', 'machine-learning', 'ui-ux', 'html5', 'css3', 'sass', 'react', 'redux', 'nextjs', 'vite', 'typescript', 'javascript', 'nodejs', 'nestjs', 'prisma', 'mongodb', 'mysql', 'postgresql', 'redis', 'graphql', 'firebase', 'tailwind', 'docker', 'git', 'github', 'linux', 'vitest', 'notion', 'figma', 'discord', 'python', 'php', 'laravel', 'java', 'dotnet', 'cpp', 'AbletonDark', 'AbletonLight', 'ActivityPubDark', 'ActivityPubLight', 'ActixDark', 'ActixLight', 'Adonis', 'AfterEffects', 'AiScriptDark', 'AiScriptLight', 'AlpineJSDark', 'AlpineJSLight', 'AnacondaDark', 'AnacondaLight', 'AndroidStudioDark', 'AndroidStudioLight', 'AngularDark', 'AngularLight', 'Ansible', 'Apollo', 'AppleDark', 'AppleLight', 'Appwrite', 'ArchDark', 'ArchLight', 'Arduino', 'Astro', 'Atom', 'Audition', 'AutoCADDark', 'AutoCADLight', 'AWSDark', 'AWSLight', 'Azul', 'AzureDark', 'AzureLight', 'Babel', 'BashDark', 'BashLight', 'BevyDark', 'BevyLight', 'BitBucketDark', 'BitBucketLight', 'BlenderDark', 'BlenderLight', 'Bootstrap', 'BSDDark', 'BSDLight', 'BunDark', 'BunLight', 'C', 'CLionDark', 'CLionLight', 'CMakeDark', 'CMakeLight', 'CS', 'CassandraDark', 'CassandraLight', 'ClojureDark', 'ClojureLight', 'CloudflareDark', 'CloudflareLight', 'CodePenDark', 'CodePenLight', 'CoffeeScriptDark', 'CoffeeScriptLight', 'CrystalDark', 'CrystalLight', 'CypressDark', 'CypressLight', 'D3Dark', 'D3Light', 'DartDark', 'DartLight', 'DebianDark', 'DebianLight', 'DENODark', 'DENOLight', 'DevToDark', 'DevToLight', 'DiscordBots', 'DiscordJSDark', 'DiscordJSLight', 'Django', 'DynamoDBDark', 'DynamoDBLight', 'EclipseDark', 'EclipseLight', 'ElasticsearchDark', 'ElasticsearchLight', 'Electron', 'ElixirDark', 'ElixirLight', 'ElysiaDark', 'ElysiaLight', 'Emacs', 'Ember', 'EmotionDark', 'EmotionLight', 'ExpressJSDark', 'ExpressJSLight', 'FastAPI', 'FediverseDark', 'FediverseLight', 'FigmaLight', 'FirebaseLight', 'FlaskDark', 'FlaskLight', 'FlutterDark', 'FlutterLight', 'Forth', 'Fortran', 'GameMakerStudio', 'Gatsby', 'GCPDark', 'GCPLight', 'GherkinDark', 'GherkinLight', 'GitLabDark', 'GitLabLight', 'GithubActionsDark', 'GithubActionsLight', 'GithubLight', 'GmailDark', 'GmailLight', 'GoLang', 'GodotDark', 'GodotLight', 'GradleDark', 'GradleLight', 'GrafanaDark', 'GrafanaLight', 'GraphQLLight', 'GTKDark', 'GTKLight', 'Gulp', 'HaskellDark', 'HaskellLight', 'HaxeDark', 'HaxeFlixelDark', 'HaxeFlixelLight', 'HaxeLight', 'Heroku', 'HibernateDark', 'HibernateLight', 'HtmxDark', 'HtmxLight', 'IdeaDark', 'IdeaLight', 'Illustrator', 'Instagram', 'IPFSDark', 'IPFSLight', 'JQuery', 'JavaLight', 'JenkinsDark', 'JenkinsLight', 'Jest', 'JuliaDark', 'JuliaLight', 'Kafka', 'KaliDark', 'KaliLight', 'KotlinDark', 'KotlinLight', 'KtorDark', 'KtorLight', 'Kubernetes', 'LaTeXDark', 'LaTeXLight', 'LaravelLight', 'LessDark', 'LessLight', 'LinkedIn', 'LinuxLight', 'LitDark', 'LitLight', 'LuaDark', 'LuaLight', 'MarkdownDark', 'MarkdownLight', 'MastodonDark', 'MastodonLight', 'MaterialUIDark', 'MaterialUILight', 'MatlabDark', 'MatlabLight', 'MavenDark', 'MavenLight', 'MintDark', 'MintLight', 'MisskeyDark', 'MisskeyLight', 'MySQLLight', 'NeoVimDark', 'NeoVimLight', 'NestJSLight', 'NetlifyDark', 'NetlifyLight', 'NextJSLight', 'Nginx', 'NimDark', 'NimLight', 'NixDark', 'NixLight', 'NodeJSLight', 'NotionLight', 'NpmDark', 'NpmLight', 'NuxtJSDark', 'NuxtJSLight', 'OCaml', 'ObsidianDark', 'ObsidianLight', 'OctaveDark', 'OctaveLight', 'OpenCVDark', 'OpenCVLight', 'OpenShift', 'OpenStackDark', 'OpenStackLight', 'p5js', 'Perl', 'Photoshop', 'PHPLight', 'PhpStormDark', 'PhpStormLight', 'PiniaDark', 'PiniaLight', 'PklDark', 'PklLight', 'Plan9Dark', 'Plan9Light', 'PlanetScaleDark', 'PlanetScaleLight', 'PnpmDark', 'PnpmLight', 'PostgreSQLLight', 'Postman', 'PowershellDark', 'PowershellLight', 'Premiere', 'ProcessingDark', 'ProcessingLight', 'Prometheus', 'PugDark', 'PugLight', 'PyCharmDark', 'PyCharmLight', 'PyTorchDark', 'PyTorchLight', 'PythonLight', 'QTDark', 'QTLight', 'RDark', 'RLight', 'RabbitMQDark', 'RabbitMQLight', 'Rails', 'RaspberryPiDark', 'RaspberryPiLight', 'ReactLight', 'ReactiveXDark', 'ReactiveXLight', 'RedHatDark', 'RedHatLight', 'RedisLight', 'RegexDark', 'RegexLight', 'RemixDark', 'RemixLight', 'ReplitDark', 'ReplitLight', 'RiderDark', 'RiderLight', 'RobloxStudio', 'Rocket', 'RollupJSDark', 'RollupJSLight', 'ROSDark', 'ROSLight', 'Ruby', 'Rust', 'ScalaDark', 'ScalaLight', 'SciKitLearnLight', 'ScikitLearnDark', 'Selenium', 'Sentry', 'SequelizeDark', 'SequelizeLight', 'SketchupDark', 'SketchupLight', 'SolidJSDark', 'SolidJSLight', 'Solidity', 'SpringDark', 'SpringLight', 'SQLite', 'StackOverflowDark', 'StackOverflowLight', 'StyledComponents', 'SublimeDark', 'SublimeLight', 'SupabaseDark', 'SupabaseLight', 'Svelte', 'SVGDark', 'SVGLight', 'Swift', 'SymfonyDark', 'SymfonyLight', 'TailwindCSSLight', 'TauriDark', 'TauriLight', 'TensorFlowDark', 'TensorFlowLight', 'TerraformDark', 'TerraformLight', 'ThreeJSDark', 'ThreeJSLight', 'Twitter', 'UbuntuDark', 'UbuntuLight', 'UnityDark', 'UnityLight', 'UnrealEngine', 'VDark', 'VLight', 'Vala', 'VercelDark', 'VercelLight', 'VIMDark', 'VIMLight', 'VisualStudioDark', 'VisualStudioLight', 'ViteLight', 'VitestLight', 'VSCodeDark', 'VSCodeLight', 'VSCodiumDark', 'VSCodiumLight', 'VueJSDark', 'VueJSLight', 'VuetifyDark', 'VuetifyLight', 'WebAssembly', 'WebStormDark', 'WebStormLight', 'Webflow', 'WebpackDark', 'WebpackLight', 'WindiCSSDark', 'WindiCSSLight', 'WindowsDark', 'WindowsLight', 'Wordpress', 'WorkersDark', 'WorkersLight', 'XD', 'YarnDark', 'YarnLight', 'YewDark', 'YewLight', 'ZigDark', 'ZigLight');
  CREATE TYPE "public"."enum_projects_project_status" AS ENUM('planned', 'in-progress', 'completed');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_version_project_status" AS ENUM('planned', 'in-progress', 'completed');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_published_locale" AS ENUM('en', 'pl');
  CREATE TYPE "public"."enum_certificates_source" AS ENUM('manual', 'credly');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "certificate_scans" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "visits" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"timestamp" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "skills" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"icon" "enum_skills_icon" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "projects_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "projects_media_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "projects_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"project_status" "enum_projects_project_status" DEFAULT 'planned',
  	"start_date" timestamp(3) with time zone,
  	"thumbnail_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "projects_locales" (
  	"title" varchar,
  	"summary" varchar,
  	"my_contribution" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skills_id" integer,
  	"people_id" integer
  );
  
  CREATE TABLE "_projects_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_media_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_project_status" "enum__projects_v_version_project_status" DEFAULT 'planned',
  	"version_start_date" timestamp(3) with time zone,
  	"version_thumbnail_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__projects_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_projects_v_locales" (
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_my_contribution" varchar,
  	"version_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skills_id" integer,
  	"people_id" integer
  );
  
  CREATE TABLE "people" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar NOT NULL,
  	"can_login" boolean DEFAULT false NOT NULL,
  	"profile_image_id" integer,
  	"social_media_link" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "experiences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "experiences_locales" (
  	"title" varchar NOT NULL,
  	"organization" varchar,
  	"description" varchar NOT NULL,
  	"period_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "certificates_skills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "certificates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"source" "enum_certificates_source" DEFAULT 'manual' NOT NULL,
  	"visible" boolean DEFAULT true,
  	"external_id" varchar,
  	"title" varchar NOT NULL,
  	"issuer" varchar NOT NULL,
  	"description" varchar,
  	"issued_at" timestamp(3) with time zone NOT NULL,
  	"expires_at" timestamp(3) with time zone,
  	"issued_to" varchar,
  	"credential_is_pdf" boolean DEFAULT false,
  	"credential_url" varchar,
  	"credential_file_id" integer,
  	"global_activity_url" varchar,
  	"image_uses_upload" boolean DEFAULT false,
  	"source_updated_at" timestamp(3) with time zone,
  	"image_id" integer,
  	"image_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "certificates_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"certificate_scans_id" integer
  );
  
  CREATE TABLE "commands" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"command" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"output" varchar NOT NULL,
  	"visible" boolean DEFAULT true,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"certificate_scans_id" integer,
  	"visits_id" integer,
  	"skills_id" integer,
  	"projects_id" integer,
  	"people_id" integer,
  	"experiences_id" integer,
  	"certificates_id" integer,
  	"commands_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "landing_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "landing_page_locales" (
  	"about_me" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_tags" ADD CONSTRAINT "projects_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_media_links" ADD CONSTRAINT "projects_media_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_gallery" ADD CONSTRAINT "projects_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_gallery" ADD CONSTRAINT "projects_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_tags" ADD CONSTRAINT "_projects_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_media_links" ADD CONSTRAINT "_projects_v_version_media_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_gallery" ADD CONSTRAINT "_projects_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_version_gallery" ADD CONSTRAINT "_projects_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_thumbnail_id_media_id_fk" FOREIGN KEY ("version_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_locales" ADD CONSTRAINT "_projects_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people" ADD CONSTRAINT "people_profile_image_id_media_id_fk" FOREIGN KEY ("profile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences_locales" ADD CONSTRAINT "experiences_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "certificates_skills" ADD CONSTRAINT "certificates_skills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."certificates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "certificates" ADD CONSTRAINT "certificates_credential_file_id_media_id_fk" FOREIGN KEY ("credential_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certificates" ADD CONSTRAINT "certificates_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certificates_rels" ADD CONSTRAINT "certificates_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."certificates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "certificates_rels" ADD CONSTRAINT "certificates_rels_certificate_scans_fk" FOREIGN KEY ("certificate_scans_id") REFERENCES "public"."certificate_scans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_certificate_scans_fk" FOREIGN KEY ("certificate_scans_id") REFERENCES "public"."certificate_scans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_visits_fk" FOREIGN KEY ("visits_id") REFERENCES "public"."visits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_experiences_fk" FOREIGN KEY ("experiences_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_certificates_fk" FOREIGN KEY ("certificates_id") REFERENCES "public"."certificates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_commands_fk" FOREIGN KEY ("commands_id") REFERENCES "public"."commands"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_page_locales" ADD CONSTRAINT "landing_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landing_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "certificate_scans_updated_at_idx" ON "certificate_scans" USING btree ("updated_at");
  CREATE INDEX "certificate_scans_created_at_idx" ON "certificate_scans" USING btree ("created_at");
  CREATE UNIQUE INDEX "certificate_scans_filename_idx" ON "certificate_scans" USING btree ("filename");
  CREATE INDEX "visits_updated_at_idx" ON "visits" USING btree ("updated_at");
  CREATE INDEX "visits_created_at_idx" ON "visits" USING btree ("created_at");
  CREATE UNIQUE INDEX "skills_name_idx" ON "skills" USING btree ("name");
  CREATE INDEX "skills_updated_at_idx" ON "skills" USING btree ("updated_at");
  CREATE INDEX "skills_created_at_idx" ON "skills" USING btree ("created_at");
  CREATE INDEX "projects_tags_order_idx" ON "projects_tags" USING btree ("_order");
  CREATE INDEX "projects_tags_parent_id_idx" ON "projects_tags" USING btree ("_parent_id");
  CREATE INDEX "projects_media_links_order_idx" ON "projects_media_links" USING btree ("_order");
  CREATE INDEX "projects_media_links_parent_id_idx" ON "projects_media_links" USING btree ("_parent_id");
  CREATE INDEX "projects_gallery_order_idx" ON "projects_gallery" USING btree ("_order");
  CREATE INDEX "projects_gallery_parent_id_idx" ON "projects_gallery" USING btree ("_parent_id");
  CREATE INDEX "projects_gallery_image_idx" ON "projects_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_thumbnail_idx" ON "projects" USING btree ("thumbnail_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE UNIQUE INDEX "projects_locales_locale_parent_id_unique" ON "projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_skills_id_idx" ON "projects_rels" USING btree ("skills_id");
  CREATE INDEX "projects_rels_people_id_idx" ON "projects_rels" USING btree ("people_id");
  CREATE INDEX "_projects_v_version_tags_order_idx" ON "_projects_v_version_tags" USING btree ("_order");
  CREATE INDEX "_projects_v_version_tags_parent_id_idx" ON "_projects_v_version_tags" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_media_links_order_idx" ON "_projects_v_version_media_links" USING btree ("_order");
  CREATE INDEX "_projects_v_version_media_links_parent_id_idx" ON "_projects_v_version_media_links" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_gallery_order_idx" ON "_projects_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_projects_v_version_gallery_parent_id_idx" ON "_projects_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_gallery_image_idx" ON "_projects_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_version_thumbnail_idx" ON "_projects_v" USING btree ("version_thumbnail_id");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_snapshot_idx" ON "_projects_v" USING btree ("snapshot");
  CREATE INDEX "_projects_v_published_locale_idx" ON "_projects_v" USING btree ("published_locale");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_projects_v_locales_locale_parent_id_unique" ON "_projects_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_rels_order_idx" ON "_projects_v_rels" USING btree ("order");
  CREATE INDEX "_projects_v_rels_parent_idx" ON "_projects_v_rels" USING btree ("parent_id");
  CREATE INDEX "_projects_v_rels_path_idx" ON "_projects_v_rels" USING btree ("path");
  CREATE INDEX "_projects_v_rels_skills_id_idx" ON "_projects_v_rels" USING btree ("skills_id");
  CREATE INDEX "_projects_v_rels_people_id_idx" ON "_projects_v_rels" USING btree ("people_id");
  CREATE INDEX "people_profile_image_idx" ON "people" USING btree ("profile_image_id");
  CREATE INDEX "people_updated_at_idx" ON "people" USING btree ("updated_at");
  CREATE INDEX "people_created_at_idx" ON "people" USING btree ("created_at");
  CREATE INDEX "experiences_updated_at_idx" ON "experiences" USING btree ("updated_at");
  CREATE INDEX "experiences_created_at_idx" ON "experiences" USING btree ("created_at");
  CREATE UNIQUE INDEX "experiences_locales_locale_parent_id_unique" ON "experiences_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "certificates_skills_order_idx" ON "certificates_skills" USING btree ("_order");
  CREATE INDEX "certificates_skills_parent_id_idx" ON "certificates_skills" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "certificates_external_id_idx" ON "certificates" USING btree ("external_id");
  CREATE INDEX "certificates_credential_file_idx" ON "certificates" USING btree ("credential_file_id");
  CREATE INDEX "certificates_image_idx" ON "certificates" USING btree ("image_id");
  CREATE INDEX "certificates_updated_at_idx" ON "certificates" USING btree ("updated_at");
  CREATE INDEX "certificates_created_at_idx" ON "certificates" USING btree ("created_at");
  CREATE INDEX "certificates_rels_order_idx" ON "certificates_rels" USING btree ("order");
  CREATE INDEX "certificates_rels_parent_idx" ON "certificates_rels" USING btree ("parent_id");
  CREATE INDEX "certificates_rels_path_idx" ON "certificates_rels" USING btree ("path");
  CREATE INDEX "certificates_rels_certificate_scans_id_idx" ON "certificates_rels" USING btree ("certificate_scans_id");
  CREATE UNIQUE INDEX "commands_command_idx" ON "commands" USING btree ("command");
  CREATE INDEX "commands_updated_at_idx" ON "commands" USING btree ("updated_at");
  CREATE INDEX "commands_created_at_idx" ON "commands" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_certificate_scans_id_idx" ON "payload_locked_documents_rels" USING btree ("certificate_scans_id");
  CREATE INDEX "payload_locked_documents_rels_visits_id_idx" ON "payload_locked_documents_rels" USING btree ("visits_id");
  CREATE INDEX "payload_locked_documents_rels_skills_id_idx" ON "payload_locked_documents_rels" USING btree ("skills_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_people_id_idx" ON "payload_locked_documents_rels" USING btree ("people_id");
  CREATE INDEX "payload_locked_documents_rels_experiences_id_idx" ON "payload_locked_documents_rels" USING btree ("experiences_id");
  CREATE INDEX "payload_locked_documents_rels_certificates_id_idx" ON "payload_locked_documents_rels" USING btree ("certificates_id");
  CREATE INDEX "payload_locked_documents_rels_commands_id_idx" ON "payload_locked_documents_rels" USING btree ("commands_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE UNIQUE INDEX "landing_page_locales_locale_parent_id_unique" ON "landing_page_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "certificate_scans" CASCADE;
  DROP TABLE "visits" CASCADE;
  DROP TABLE "skills" CASCADE;
  DROP TABLE "projects_tags" CASCADE;
  DROP TABLE "projects_media_links" CASCADE;
  DROP TABLE "projects_gallery" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_locales" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "_projects_v_version_tags" CASCADE;
  DROP TABLE "_projects_v_version_media_links" CASCADE;
  DROP TABLE "_projects_v_version_gallery" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_locales" CASCADE;
  DROP TABLE "_projects_v_rels" CASCADE;
  DROP TABLE "people" CASCADE;
  DROP TABLE "experiences" CASCADE;
  DROP TABLE "experiences_locales" CASCADE;
  DROP TABLE "certificates_skills" CASCADE;
  DROP TABLE "certificates" CASCADE;
  DROP TABLE "certificates_rels" CASCADE;
  DROP TABLE "commands" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "landing_page" CASCADE;
  DROP TABLE "landing_page_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_skills_icon";
  DROP TYPE "public"."enum_projects_project_status";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_version_project_status";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum__projects_v_published_locale";
  DROP TYPE "public"."enum_certificates_source";`)
}

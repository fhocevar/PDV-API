









SELECT DISTINCT role FROM "Usuario";

DELETE FROM "Usuario" WHERE role NOT IN ('ADMIN', 'SUPERVISOR', 'GERENTE', 'USUARIO_COMUM');

SELECT n.nspname AS "Schema",
       t.typname AS "Name",
       pg_catalog.pg_get_userbyid(t.typowner) AS "Owner"
FROM pg_catalog.pg_type t
     JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
WHERE t.typtype = 'e';

SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'usuario';


SELECT n.nspname AS "Schema",
       t.typname AS "Name"
FROM pg_catalog.pg_type t
     JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
WHERE t.typtype = 'e';

SELECT unnest(enum_range(NULL::"public"."UserRole")) AS role;

select * from public."Usuario"

select * from public."Cliente"

SELECT unnest(enum_range(NULL::public."UserRole")) AS role;
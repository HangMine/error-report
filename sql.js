const mysql = require("promise-mysql");

//连接数据库
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'blog',
  connectionLimit: 10
})

// 获取全部表头的SQL语句
const getSql_tableHeader = (tableName, dbName = 'blog') => {
  return `select COLUMN_NAME from information_schema.COLUMNS WHERE table_name = '${tableName}' and table_schema = '${dbName}';`
}

// 获取where条件的SQL语句
const getWhereSql = params => {
  if (params && Object.keys(params).length) {
    let arr = [];
    for ([key, value] of Object.entries(params)) {
      arr.push(getConditionSql(key, value));
    }
    return ' where ' + arr.join(' and ');
  } else {
    return ''
  }
}

// 获取sql条件语句
const getConditionSql = (key, value) => {
  return `${key}='${transSemi(value)}'`;
}

// 转义单引号
const transSemi = (str) => {
  switch (typeof str) {
    case 'string':
      return str.replace(/'/g, '\\\'')

    default:
      return str;
  }

}

const sql = {
  select: (tableName, params) => {
    return pool.then((conn) => {
      const sql_select = `select * from ${tableName} ${getWhereSql(params)}`;
      return conn.query(sql_select)
    })

  },
  insert: (tableName, params) => {
    const header = Object.keys(params).join();
    const values = Object.values(params).typeJoin();

    return pool.then((conn) => {
      const sql_insert = `INSERT INTO ${tableName} ( ${header} ) VALUES ( ${values} );`
      return conn.query(sql_insert);
    }).then(data => {
      return sql.select(tableName, { id: data.insertId }).then(rows => {
        return rows[0] || {}
      })
    })

  },
  update: (tableName, params, pk = 'id') => {
    return pool.then((conn) => {
      const pk_value = params[pk];
      delete params[pk];
      const sql_set = Object.entries(params).map(([key, value]) => getConditionSql(key, value)).join();
      const sql_update = `UPDATE ${tableName} SET ${sql_set} WHERE ${getConditionSql(pk, pk_value)};`
      return conn.query(sql_update)
    })
  },
  delete: (tableName, id, pk = 'id') => {
    return pool.then((conn) => {
      const sql_delete = `DELETE FROM ${tableName} WHERE ${getConditionSql(pk, id)};`;
      return conn.query(sql_delete)
    }).then(data => {
      return sql.select(tableName, { id: data.insertId }).then(rows => {
        return rows[0] || {}
      })
    })
  },
  query: (sql) => {
    return pool.then((conn) => {
      return conn.query(sql)
    })
  },
  diy: () => {
    return pool
  }
}

module.exports = sql;
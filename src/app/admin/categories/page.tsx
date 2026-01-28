'use client'

import { useEffect, useMemo, useState, type FormEvent } from 'react'

type Category = {
  id?: number
  name: string
  parentId?: number | null
  keyword?: string | null
  icon?: string | null
  active_icon?: string | null
}

export default function AdminCategoriesPage() {
  const [list, setList] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)
  const [filterParent, setFilterParent] = useState<number | null>(null)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [batchEditing, setBatchEditing] = useState<{ visible: boolean; parentId: number | null }>({ visible: false, parentId: null })

  const api = (path: string) => {
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/app2')) return `/app2${path}`
    return path
  }

  const load = async () => {
    setLoading(true)
    try {
      const url = api(filterParent != null ? `/api/admin/category?parentId=${filterParent}` : '/api/admin/category')
      const resp = await fetch(url)
      const data = await resp.json()
      setList(Array.isArray(data?.data) ? data.data : [])
    } catch (e) {
      console.error('加载分类失败', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [filterParent])

  const parents = useMemo(() => list.filter(c => !c.parentId), [list])

  const startCreate = () => setEditing({ name: '', parentId: filterParent ?? null, keyword: '', icon: '', active_icon: '' })
  const startEdit = (c: Category) => setEditing({ ...c })
  const cancelEdit = () => setEditing(null)

  const save = async () => {
    if (!editing) return
    const method = editing.id ? 'PUT' : 'POST'
    const body = JSON.stringify(editing)
    const resp = await fetch(api('/api/admin/category'), { method, body, headers: { 'Content-Type': 'application/json' } })
    const data = await resp.json()
    if (data?.code === 200) {
      setEditing(null)
      await load()
    } else {
      alert(data?.message || '保存失败')
    }
  }

  const remove = async (id?: number) => {
    if (!id) return
    if (!confirm('确认删除？')) return
    const resp = await fetch(api(`/api/admin/category?id=${id}`), { method: 'DELETE' })
    const data = await resp.json()
    if (data?.code === 200) {
      await load()
    } else {
      alert(data?.message || '删除失败')
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await save()
  }

  return (
    <div style={{ maxWidth: 960, margin: '24px auto', padding: 16, backgroundColor: '#fff', color: '#000' }}>
      <h1 style={{ fontSize: 20, fontWeight: 700 }}>分类 Seed 管理</h1>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12 }}>
        <label>父类筛选：</label>
        <select value={filterParent ?? ''} onChange={(e) => setFilterParent(e.target.value ? Number(e.target.value) : null)}>
          <option value=''>全部</option>
          {parents.map(p => (
            <option key={p.id} value={p.id}>{p.name} (#{p.id})</option>
          ))}
        </select>
        <button onClick={startCreate}>新建分类</button>
        <button onClick={load} disabled={loading}>{loading ? '加载中...' : '刷新'}</button>
        {selectedIds.length > 0 && (
          <button onClick={() => setBatchEditing({ visible: true, parentId: null })}>
            批量修改父类
          </button>
        )}
      </div>

      {/* 将内联编辑表单改为模态框 */}
      {editing && (
        <div role="dialog" aria-modal="true" style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={cancelEdit}>
          <div style={{ width: 'min(92vw, 720px)', background: '#fff', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.2)', overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #eee' }}>
              <h2 style={{ fontSize: 16, margin: 0 }}>{editing.id ? `编辑分类 #${editing.id}` : '新建分类'}</h2>
              <button onClick={cancelEdit} aria-label="关闭" style={{ border: 'none', background: 'transparent', fontSize: 20, lineHeight: 1, cursor: 'pointer' }}>×</button>
            </div>
            <form onSubmit={handleSubmit} style={{ padding: 16 }} autoComplete="off">
              <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 8, alignItems: 'center' }}>
                <label htmlFor="name">名称</label>
                <input id="name" name="name" required value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
                <label htmlFor="parentId">父类ID</label>
                <input id="parentId" name="parentId" type="number" value={editing.parentId ?? ''} onChange={(e) => setEditing({ ...editing, parentId: e.target.value ? Number(e.target.value) : null })} />
                <label htmlFor="keyword">关键词</label>
                <input id="keyword" name="keyword" value={editing.keyword ?? ''} onChange={(e) => setEditing({ ...editing, keyword: e.target.value })} />
                <label htmlFor="icon">图标</label>
                <input id="icon" name="icon" value={editing.icon ?? ''} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} />
                <label htmlFor="active_icon">激活图标</label>
                <input id="active_icon" name="active_icon" value={editing.active_icon ?? ''} onChange={(e) => setEditing({ ...editing, active_icon: e.target.value })} />
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 12, justifyContent: 'flex-end' }}>
                <button type="button" onClick={cancelEdit}>取消</button>
                <button type="submit">保存</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 批量修改父类模态框 */}
      {batchEditing.visible && (
        <div role="dialog" aria-modal="true" style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setBatchEditing({ ...batchEditing, visible: false })}>
          <div style={{ width: 'min(92vw, 520px)', background: '#fff', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.2)', overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #eee' }}>
              <h2 style={{ fontSize: 16, margin: 0 }}>批量修改父类</h2>
              <button onClick={() => setBatchEditing({ ...batchEditing, visible: false })} aria-label="关闭" style={{ border: 'none', background: 'transparent', fontSize: 20, lineHeight: 1, cursor: 'pointer' }}>×</button>
            </div>
            <div style={{ padding: 16 }}>
              <p style={{ marginBottom: 12 }}>选择要设置的父类（{selectedIds.length}个分类）：</p>
              <select 
                value={batchEditing.parentId ?? ''} 
                onChange={(e) => setBatchEditing({ ...batchEditing, parentId: e.target.value ? Number(e.target.value) : null })} 
                style={{ width: '100%', padding: 8, marginBottom: 16 }}
              >
                <option value=''>无父类</option>
                {parents.map(p => (
                  <option key={p.id} value={p.id}>{p.name} (#{p.id})</option>
                ))}
              </select>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button onClick={() => setBatchEditing({ ...batchEditing, visible: false })}>取消</button>
                <button onClick={async () => {
                  if (selectedIds.length === 0) return;
                  try {
                    const resp = await fetch(api('/api/admin/category'), {
                      method: 'PATCH',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ ids: selectedIds, parentId: batchEditing.parentId })
                    });
                    const data = await resp.json();
                    if (data?.code === 200) {
                      setBatchEditing({ ...batchEditing, visible: false });
                      setSelectedIds([]);
                      await load();
                    } else {
                      alert(data?.message || '批量修改失败');
                    }
                  } catch (e) {
                    console.error('批量修改失败', e);
                    alert('批量修改失败');
                  }
                }}>确定</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: 16 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ddd', textAlign: 'left', padding: 8, width: '40px' }}>
                <input 
                  type="checkbox" 
                  checked={selectedIds.length === list.length && list.length > 0} 
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedIds(list.filter(c => c.id).map(c => c.id!))
                    } else {
                      setSelectedIds([])
                    }
                  }}
                />
              </th>
              <th style={{ borderBottom: '1px solid #ddd', textAlign: 'left', padding: 8 }}>ID</th>
              <th style={{ borderBottom: '1px solid #ddd', textAlign: 'left', padding: 8 }}>名称</th>
              <th style={{ borderBottom: '1px solid #ddd', textAlign: 'left', padding: 8 }}>父类ID</th>
              <th style={{ borderBottom: '1px solid #ddd', textAlign: 'left', padding: 8 }}>关键词</th>
              <th style={{ borderBottom: '1px solid #ddd', textAlign: 'left', padding: 8 }}>图标</th>
              <th style={{ borderBottom: '1px solid #ddd', textAlign: 'left', padding: 8 }}>激活图标</th>
              <th style={{ borderBottom: '1px solid #ddd', textAlign: 'left', padding: 8 }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {list.map(c => (
              <tr 
                key={c.id} 
                onClick={() => {
                  if (c.id) {
                    if (selectedIds.includes(c.id)) {
                      setSelectedIds(selectedIds.filter(id => id !== c.id))
                    } else {
                      setSelectedIds([...selectedIds, c.id])
                    }
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                <td style={{ borderBottom: '1px solid #f0f0f0', padding: 8 }}>
                  {c.id && (
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(c.id!)} 
                      onChange={(e) => {
                        e.stopPropagation(); // 阻止事件冒泡，避免触发行点击
                        if (e.target.checked) {
                          setSelectedIds([...selectedIds, c.id!])
                        } else {
                          setSelectedIds(selectedIds.filter(id => id !== c.id))
                        }
                      }}
                    />
                  )}
                </td>
                <td style={{ borderBottom: '1px solid #f0f0f0', padding: 8 }}>{c.id}</td>
                <td style={{ borderBottom: '1px solid #f0f0f0', padding: 8 }}>{c.name}</td>
                <td style={{ borderBottom: '1px solid #f0f0f0', padding: 8 }}>{c.parentId ?? ''}</td>
                <td style={{ borderBottom: '1px solid #f0f0f0', padding: 8 }}>{c.keyword ?? ''}</td>
                <td style={{ borderBottom: '1px solid #f0f0f0', padding: 8, maxWidth: '120px', wordBreak: 'break-all' }}>{c.icon ?? ''}</td>
                <td style={{ borderBottom: '1px solid #f0f0f0', padding: 8, maxWidth: '120px', wordBreak: 'break-all' }}>{c.active_icon ?? ''}</td>
                <td style={{ borderBottom: '1px solid #f0f0f0', padding: 8 }}>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); // 阻止事件冒泡，避免触发行点击
                      startEdit(c)
                    }}
                  >
                    编辑
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); // 阻止事件冒泡，避免触发行点击
                      remove(c.id)
                    }} 
                    style={{ marginLeft: 8 }}
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr>
                <td colSpan={8} style={{ padding: 16, textAlign: 'center', color: '#888' }}>暂无数据</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
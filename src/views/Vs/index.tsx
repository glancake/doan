import { memo } from 'react'

interface VsProps {
  // 定义组件props类型
}

/**
 * Vs视图组件
 * @description 用于展示VS相关内容
 */
const Vs: React.FC<VsProps> = memo(() => {
  return <div className="vs-container">VS</div>
})

Vs.displayName = 'Vs'

export default Vs

package net.dankito.richtexteditor.android.toolbar

import android.app.Activity
import android.content.Context
import android.graphics.Color
import android.support.v4.content.ContextCompat
import android.util.AttributeSet
import android.view.View
import android.view.ViewGroup
import android.widget.RelativeLayout
import net.dankito.richtexteditor.android.RichTextEditor
import net.dankito.richtexteditor.android.extensions.calculateOnMeasure
import net.dankito.richtexteditor.android.extensions.initializeView
import net.dankito.richtexteditor.android.extensions.updatePosition
import net.dankito.richtexteditor.command.ToolbarCommand


open class GroupedCommandsView : RelativeLayout, IFloatingView {

    constructor(context: Context?) : super(context) { init() }
    constructor(context: Context?, attrs: AttributeSet?) : super(context, attrs) { init() }
    constructor(context: Context?, attrs: AttributeSet?, defStyleAttr: Int) : super(context, attrs, defStyleAttr) { init() }



    override var command: ToolbarCommand? = null

    override var editor: RichTextEditor? = null

    override var toolbar: EditorToolbar? = null

    override var lastEditorHeight = 0

    override var setMaxHeightOnNextMeasurement = false

    override var hasEditorHeightChanged = true


    private fun init() {
        this.visibility = View.GONE
        this.setBackgroundColor(Color.WHITE)

        val primaryColorIdentifier = resources.getIdentifier("colorPrimary", "color", (context as Activity).packageName)
        if(primaryColorIdentifier > 0) { // returns 0 in case resource is not found
            setBackgroundColor(ContextCompat.getColor(context, primaryColorIdentifier))
        }

        layoutParams?.let { params ->
            params.width = ViewGroup.LayoutParams.MATCH_PARENT
            params.height = ViewGroup.LayoutParams.WRAP_CONTENT
        }
    }

    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        val adjustedHeightAndUpdatePosition = calculateOnMeasure(widthMeasureSpec, heightMeasureSpec)
        val adjustedHeight = adjustedHeightAndUpdatePosition.first
        val updatePosition = adjustedHeightAndUpdatePosition.second

        super.onMeasure(widthMeasureSpec, adjustedHeight)

        if(updatePosition) {
            updatePosition()
        }
    }


    open fun initialize(editor: RichTextEditor, command: ToolbarCommand) {
        initializeView(editor, command)
    }

}